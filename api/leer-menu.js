import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'

// Lee la foto del menú semanal de la escuela de Adri y devuelve colación y comida por día.
// El desayuno se ignora: Adri desayuna en casa.

const client = new Anthropic() // ANTHROPIC_API_KEY en las variables de entorno de Vercel

const MenuEscuela = z.object({
  dias: z.array(z.object({
    dia: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']),
    colacion: z.string(),
    comida: z.string(),
  })),
})

const PROMPT = `Esta es la foto del menú semanal de la escuela de un niño de 3 años.
Para cada día de lunes a viernes que aparezca, transcribe en español:
- colacion: la colación / snack / refrigerio
- comida: la comida (todos los platos: sopa, plato fuerte, guarnición, postre, agua)
Ignora por completo el desayuno: el niño desayuna en casa.
Copia los platos tal como están escritos, sin inventar. Si un campo no aparece para un día, déjalo vacío.`

const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Falta ANTHROPIC_API_KEY en Vercel' })
  }

  const { data, mediaType } = req.body || {}
  if (!data || !MEDIA_TYPES.includes(mediaType)) {
    return res.status(400).json({ error: 'Imagen inválida' })
  }

  try {
    const response = await client.beta.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      output_config: { effort: 'low', format: betaZodOutputFormat(MenuEscuela) },
      // Si el modelo rechaza la petición, la API la reintenta sola con otro modelo
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
          { type: 'text', text: PROMPT },
        ],
      }],
    })

    if (response.stop_reason === 'refusal' || !response.parsed_output) {
      console.error('[leer-menu] sin resultado:', response.stop_reason)
      return res.status(422).json({ error: 'No se pudo leer el menú, prueba con otra foto' })
    }
    return res.status(200).json(response.parsed_output)
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('[leer-menu] API key inválida')
      return res.status(500).json({ error: 'La API key de Anthropic no es válida' })
    } else if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'Demasiadas peticiones, prueba en un minuto' })
    } else if (err instanceof Anthropic.APIError) {
      console.error('[leer-menu] API error', err.status, err.message)
      return res.status(502).json({ error: `Error de Claude (${err.status})` })
    }
    console.error('[leer-menu]', err)
    return res.status(500).json({ error: 'Error inesperado' })
  }
}
