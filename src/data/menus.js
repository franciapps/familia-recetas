// Menú en ciclo de 3 semanas, lunes a viernes.
//
// Reglas:
// - Cada comida y cena tiene carbohidrato + proteína + verdura (campo `plato`).
// - Carne roja máximo 1 vez por semana (siempre en la comida: Adri está en la escuela).
// - Pescado 1 vez por semana, en la cena (Yola y Mari no lo comen).
// - Proteínas preferidas: frijoles negros, lentejas y pollo.
// - Nada de huevo como proteína principal: ya lo comemos todos los días en el desayuno.
// - Comida: la cocinan Yola y Mari. Cena: rápida, Bimby o Cucina Botanica,
//   con la verdura ya lavada y cortada por la mañana (`prep`).
//
// Campos:
// proteina: 'pollo' | 'pescado' | 'res' | 'legumbres' — se usa para las alertas
// legumbre: 'frijoles' | 'lentejas' | 'garbanzos' | 'alubias' | 'chicharos'
// remojo: true = poner en remojo la noche anterior
// sobrante: true = es comida de un día anterior, no hay que descongelar
// receta: { fuente: 'Bimby' | 'Cucina Botanica', nombre, link }
// prep: lo que la empleada deja listo en la mañana para cocinar la cena rápido
// franci: indicación especial para Franci (1 año)

export const MENUS = {
  1: {
    Lunes: {
      comida: {
        nombre: 'Frijoles negros de olla con arroz y calabacitas a la mexicana',
        descripcion: 'Frijoles negros de olla con epazote, arroz blanco, calabacitas guisadas con jitomate y cebolla, tortillas. Cocinar doble de frijoles: se usan el martes en la cena.',
        plato: { carbo: 'Arroz y tortillas', proteina: 'Frijoles negros', verdura: 'Calabacitas, jitomate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: true,
      },
      cena: {
        nombre: 'Pollo al Varoma con papas y verduras',
        descripcion: 'Pechuga, papas, zanahorias, calabacitas y chícharos al vapor en el Bimby, con salsa suave de pimiento.',
        plato: { carbo: 'Papas', proteina: 'Pollo', verdura: 'Zanahoria, calabacita, chícharos' },
        proteina: 'pollo',
        receta: { fuente: 'Bimby', nombre: 'Pollo al Varoma con verdure e salsa ai peperoni', link: 'https://cookidoo.it/recipes/recipe/it-IT/r338926' },
        prep: [
          'Pelar y cortar en cubos 4 papas y 3 zanahorias',
          'Lavar y cortar en rodajas 2 calabacitas',
          'Cortar la pechuga en tiras y guardarla tapada en el refri',
          'Lavar y cortar en tiras 1 pimiento rojo',
        ],
      },
    },
    Martes: {
      comida: {
        nombre: 'Lentejas guisadas con zanahoria, papa y espinacas',
        descripcion: 'Lentejas con jitomate, zanahoria, papa y espinacas. Con arroz y tortillas. Cocinar doble: el miércoles se usan en la cena.',
        plato: { carbo: 'Arroz, papa', proteina: 'Lentejas', verdura: 'Zanahoria, espinacas, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
      },
      cena: {
        nombre: 'Quesadillas de frijoles negros con ensalada',
        descripcion: 'Tortillas con frijoles negros del lunes y queso oaxaca. Ensalada de jitomate, pepino y aguacate.',
        plato: { carbo: 'Tortillas', proteina: 'Frijoles negros + queso', verdura: 'Jitomate, pepino, aguacate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        sobrante: true,
        prep: [
          'Machacar los frijoles negros que sobraron del lunes',
          'Rallar el queso oaxaca',
          'Lavar y cortar jitomate y pepino, dejar en un tóper en el refri',
        ],
      },
    },
    Miércoles: {
      comida: {
        nombre: 'Picadillo de res con papa, zanahoria y chícharos',
        descripcion: 'Carne molida de res guisada con jitomate, papa, zanahoria y chícharos. Con arroz y tortillas. (Carne roja de la semana)',
        plato: { carbo: 'Arroz, papa', proteina: 'Res', verdura: 'Zanahoria, chícharos, jitomate' },
        proteina: 'res',
      },
      cena: {
        nombre: 'Pasta al ragù de lentejas',
        descripcion: 'Pasta con ragù de lentejas (las del martes) y calabacita rallada en el sugo. A los niños les encanta y no notan las lentejas.',
        plato: { carbo: 'Pasta', proteina: 'Lentejas', verdura: 'Calabacita, zanahoria, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        sobrante: true,
        receta: { fuente: 'Cucina Botanica', nombre: 'Pasta al ragù di lenticchie', link: 'https://www.cucinabotanica.com/ricette/pasta-al-rag%C3%B9-di-lenticchie/' },
        prep: [
          'Apartar 400 g de lentejas cocidas del martes (sin caldo)',
          'Picar finito 1 cebolla, 1 zanahoria y 1 rama de apio (soffritto)',
          'Rallar 1 calabacita',
        ],
      },
    },
    Jueves: {
      comida: {
        nombre: 'Pollo en salsa verde con calabacitas y papas',
        descripcion: 'Piezas de pollo en salsa de tomate verde con calabacitas y papas. Con arroz y tortillas.',
        plato: { carbo: 'Arroz, papa, tortillas', proteina: 'Pollo', verdura: 'Calabacitas, tomate verde' },
        proteina: 'pollo',
      },
      cena: {
        nombre: 'Salmón con papas y calabacitas',
        descripcion: 'Filetes de salmón con papas y calabacitas, todo en el Bimby. (Pescado de la semana)',
        plato: { carbo: 'Papas', proteina: 'Salmón', verdura: 'Calabacitas' },
        proteina: 'pescado',
        receta: { fuente: 'Bimby', nombre: 'Filetti di salmone con patate e zucchine', link: 'https://cookidoo.it/recipes/recipe/it-IT/r802475' },
        prep: [
          'Pelar y cortar en trozos 500 g de papas',
          'Lavar y cortar 2 calabacitas',
          'Revisar que el salmón esté descongelado y sin espinas',
        ],
        franci: 'Revisar bien las espinas del salmón',
      },
    },
    Viernes: {
      comida: {
        nombre: 'Enfrijoladas con queso fresco y ensalada de nopales',
        descripcion: 'Tortillas bañadas en salsa de frijol negro, con queso fresco y crema. Ensalada de nopales con jitomate y cebolla.',
        plato: { carbo: 'Tortillas', proteina: 'Frijoles negros + queso', verdura: 'Nopales, jitomate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: true,
      },
      cena: {
        nombre: 'Arroz con pollo y verduras',
        descripcion: 'Arroz con pollo, zanahorias y chícharos, todo en el Bimby.',
        plato: { carbo: 'Arroz', proteina: 'Pollo', verdura: 'Zanahoria, chícharos' },
        proteina: 'pollo',
        receta: { fuente: 'Bimby', nombre: 'Riso con pollo e verdure', link: 'https://cookidoo.it/recipes/recipe/it-IT/r92575' },
        prep: [
          'Cortar la pechuga en cubitos y guardarla tapada en el refri',
          'Pelar y cortar en cubitos 2 zanahorias',
          'Sacar los chícharos congelados',
        ],
      },
    },
  },

  2: {
    Lunes: {
      comida: {
        nombre: 'Pollo al horno con papas, zanahorias y salsa verde',
        descripcion: 'Pollo al horno con papas y zanahorias asadas, salsa verde de tomatillo y tortillas. Hacer de más: el martes se deshebra para la cena.',
        plato: { carbo: 'Papas, tortillas', proteina: 'Pollo', verdura: 'Zanahorias, tomate verde' },
        proteina: 'pollo',
      },
      cena: {
        nombre: 'Sopa de lentejas y verduras con pan tostado',
        descripcion: 'Sopa espesa de lentejas con zanahoria, apio, papa y jitomate. Con pan tostado.',
        plato: { carbo: 'Pan, papa', proteina: 'Lentejas', verdura: 'Zanahoria, apio, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
        receta: { fuente: 'Cucina Botanica', nombre: 'Zuppa di lenticchie e verdure', link: 'https://www.cucinabotanica.com/ricette/zuppa-di-lenticchie-e-verdure/' },
        prep: [
          'Escurrir las lentejas que se remojaron en la noche',
          'Picar 1 cebolla, 2 zanahorias, 1 rama de apio y 1 papa en cubitos',
          'Picar 2 jitomates',
        ],
      },
    },
    Martes: {
      comida: {
        nombre: 'Frijoles negros de olla con arroz, nopales y aguacate',
        descripcion: 'Frijoles negros de olla con epazote, arroz, nopales asados y aguacate. Cocinar doble: el jueves se usan en la cena.',
        plato: { carbo: 'Arroz, tortillas', proteina: 'Frijoles negros', verdura: 'Nopales, aguacate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: true,
      },
      cena: {
        nombre: 'Tacos de pollo deshebrado con lechuga, jitomate y aguacate',
        descripcion: 'Pollo del lunes deshebrado, en tortillas calientes con lechuga, jitomate y aguacate.',
        plato: { carbo: 'Tortillas', proteina: 'Pollo', verdura: 'Lechuga, jitomate, aguacate' },
        proteina: 'pollo',
        sobrante: true,
        prep: [
          'Deshebrar el pollo que sobró del lunes',
          'Lavar y desinfectar la lechuga, cortarla en tiras',
          'Picar 2 jitomates',
        ],
      },
    },
    Miércoles: {
      comida: {
        nombre: 'Lentejas con plátano macho, zanahoria y espinacas',
        descripcion: 'Lentejas guisadas con jitomate, zanahoria, espinacas y plátano macho. Con arroz.',
        plato: { carbo: 'Arroz, plátano macho', proteina: 'Lentejas', verdura: 'Zanahoria, espinacas, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
      },
      cena: {
        nombre: 'Salmón al vapor con puré de brócoli y papas',
        descripcion: 'Salmón al vapor con puré de brócoli y papas, todo en el Bimby. (Pescado de la semana)',
        plato: { carbo: 'Papas', proteina: 'Salmón', verdura: 'Brócoli' },
        proteina: 'pescado',
        receta: { fuente: 'Bimby', nombre: 'Salmone al vapore con purea di broccoli e patate', link: 'https://cookidoo.it/recipes/recipe/it-IT/r829531' },
        prep: [
          'Lavar el brócoli y cortarlo en floretes',
          'Pelar y cortar en trozos 3 papas',
          'Revisar que el salmón esté descongelado y sin espinas',
        ],
        franci: 'Revisar bien las espinas del salmón',
      },
    },
    Jueves: {
      comida: {
        nombre: 'Albóndigas de res en caldillo de jitomate',
        descripcion: 'Albóndigas de res en caldillo de jitomate con zanahoria y calabacita. Con arroz. (Carne roja de la semana)',
        plato: { carbo: 'Arroz', proteina: 'Res', verdura: 'Zanahoria, calabacita, jitomate' },
        proteina: 'res',
      },
      cena: {
        nombre: 'Hamburguesas de arroz y frijoles negros con ensalada',
        descripcion: 'Hamburguesas de frijoles negros y arroz (las dos cosas del martes) al horno, con ensalada y camote al horno.',
        plato: { carbo: 'Arroz, camote', proteina: 'Frijoles negros', verdura: 'Lechuga, jitomate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        sobrante: true,
        receta: { fuente: 'Cucina Botanica', nombre: 'Burger di riso e fagioli neri', link: 'https://www.cucinabotanica.com/ricette/burger-di-riso-e-fagioli-neri-vegan-e-senza-glutine/' },
        prep: [
          'Apartar 350 g de frijoles negros del martes, bien escurridos',
          'Apartar 200 g de arroz cocido',
          'Picar finito 1 cebolla',
          'Pelar y cortar en gajos 2 camotes',
          'Lavar la lechuga',
        ],
      },
    },
    Viernes: {
      comida: {
        nombre: 'Caldo de pollo con verduras y arroz',
        descripcion: 'Caldo de pollo con zanahoria, calabacita, chayote y papa. Con arroz, limón y tortillas.',
        plato: { carbo: 'Arroz, papa', proteina: 'Pollo', verdura: 'Zanahoria, calabacita, chayote' },
        proteina: 'pollo',
      },
      cena: {
        nombre: 'Pasta con jitomate y alubias, brócoli al vapor',
        descripcion: 'Pasta con jitomates y alubias (cannellini de lata). Brócoli al vapor de guarnición.',
        plato: { carbo: 'Pasta', proteina: 'Alubias', verdura: 'Jitomate, brócoli' },
        proteina: 'legumbres',
        legumbre: 'alubias',
        receta: { fuente: 'Cucina Botanica', nombre: 'Pasta con pomodori e cannellini', link: 'https://www.cucinabotanica.com/ricette/pasta-con-pomodori-e-cannellini/' },
        prep: [
          'Lavar y cortar los jitomates',
          'Escurrir y enjuagar 1 lata de alubias',
          'Lavar el brócoli y cortarlo en floretes',
        ],
      },
    },
  },

  3: {
    Lunes: {
      comida: {
        nombre: 'Lentejas guisadas con zanahoria, papa y calabacita',
        descripcion: 'Lentejas con jitomate, zanahoria, papa y calabacita. Con arroz y tortillas. Cocinar doble: el miércoles se usan en la cena.',
        plato: { carbo: 'Arroz, papa', proteina: 'Lentejas', verdura: 'Zanahoria, calabacita, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
      },
      cena: {
        nombre: 'Albóndigas de pollo al Varoma con arroz y zanahorias',
        descripcion: 'Albóndigas de pollo al vapor en salsa suave, con arroz y zanahorias al vapor, en el Bimby.',
        plato: { carbo: 'Arroz', proteina: 'Pollo', verdura: 'Zanahorias' },
        proteina: 'pollo',
        receta: { fuente: 'Bimby', nombre: 'Polpette di pollo al Varoma in salsa delicata', link: 'https://cookidoo.it/recipes/recipe/it-IT/r338925' },
        prep: [
          'Revisar que la pechuga molida esté descongelada',
          'Pelar y cortar en bastones 4 zanahorias',
          'Lavar el arroz',
        ],
      },
    },
    Martes: {
      comida: {
        nombre: 'Frijoles negros de olla con arroz y calabacitas con elote',
        descripcion: 'Frijoles negros de olla, arroz, calabacitas con elote y jitomate, tortillas. Cocinar doble: el jueves se usan en la cena.',
        plato: { carbo: 'Arroz, elote, tortillas', proteina: 'Frijoles negros', verdura: 'Calabacitas, jitomate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: true,
      },
      cena: {
        nombre: 'Salmón al Varoma con verduras y arroz',
        descripcion: 'Filetes de salmón al vapor con verduras, todo en el Bimby. Con arroz. (Pescado de la semana)',
        plato: { carbo: 'Arroz', proteina: 'Salmón', verdura: 'Zanahoria, calabacita, ejotes' },
        proteina: 'pescado',
        receta: { fuente: 'Bimby', nombre: 'Filetti di salmone al Varoma con contorno di verdure', link: 'https://cookidoo.it/recipes/recipe/it-IT/r655277' },
        prep: [
          'Lavar y cortar 2 zanahorias, 2 calabacitas y un puño de ejotes',
          'Lavar el arroz',
          'Revisar que el salmón esté descongelado y sin espinas',
        ],
        franci: 'Revisar bien las espinas del salmón',
      },
    },
    Miércoles: {
      comida: {
        nombre: 'Caldo de res con verduras',
        descripcion: 'Chambarete en caldo con zanahoria, papa, calabacita, elote y cilantro. Con arroz, tortillas y limón. (Carne roja de la semana)',
        plato: { carbo: 'Arroz, papa, elote', proteina: 'Res', verdura: 'Zanahoria, calabacita' },
        proteina: 'res',
      },
      cena: {
        nombre: 'Albóndigas de lentejas en salsa de jitomate con puré y ejotes',
        descripcion: 'Albóndigas de lentejas (las del lunes) al horno en salsa de jitomate, con puré de papa y ejotes.',
        plato: { carbo: 'Puré de papa', proteina: 'Lentejas', verdura: 'Ejotes, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        sobrante: true,
        receta: { fuente: 'Cucina Botanica', nombre: 'Polpette di lenticchie al sugo', link: 'https://www.cucinabotanica.com/ricette/polpette-di-lenticchie-al-sugo/' },
        prep: [
          'Apartar las lentejas cocidas del lunes, bien escurridas',
          'Picar 1 cebolla y 1 diente de ajo',
          'Pelar y cortar 4 papas para el puré',
          'Lavar y despuntar los ejotes',
        ],
      },
    },
    Jueves: {
      comida: {
        nombre: 'Pollo a la jardinera',
        descripcion: 'Pollo guisado en jitomate con zanahoria, chícharos y papa. Con arroz y tortillas.',
        plato: { carbo: 'Arroz, papa', proteina: 'Pollo', verdura: 'Zanahoria, chícharos, jitomate' },
        proteina: 'pollo',
      },
      cena: {
        nombre: 'Molletes de frijol negro con pico de gallo y ensalada',
        descripcion: 'Bolillo con frijoles negros del martes y queso al horno. Pico de gallo y ensalada verde.',
        plato: { carbo: 'Bolillo', proteina: 'Frijoles negros + queso', verdura: 'Jitomate, cebolla, lechuga' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        sobrante: true,
        prep: [
          'Machacar los frijoles negros que sobraron del martes',
          'Rallar el queso',
          'Hacer el pico de gallo (jitomate, cebolla, cilantro; el chile aparte)',
          'Lavar y desinfectar la lechuga',
        ],
      },
    },
    Viernes: {
      comida: {
        nombre: 'Garbanzos guisados con espinacas y zanahoria',
        descripcion: 'Garbanzos con jitomate, zanahoria y espinacas. Con arroz y tortillas.',
        plato: { carbo: 'Arroz, tortillas', proteina: 'Garbanzos', verdura: 'Espinacas, zanahoria, jitomate' },
        proteina: 'legumbres',
        legumbre: 'garbanzos',
        remojo: true,
      },
      cena: {
        nombre: 'Pasta con chícharos y queso, calabacitas salteadas',
        descripcion: 'Pasta con crema de chícharos y queso parmesano. Calabacitas salteadas de guarnición.',
        plato: { carbo: 'Pasta', proteina: 'Chícharos + queso', verdura: 'Chícharos, calabacitas' },
        proteina: 'legumbres',
        legumbre: 'chicharos',
        receta: { fuente: 'Cucina Botanica', nombre: 'Pasta ai piselli', link: 'https://www.cucinabotanica.com/ricette/pasta-ai-piselli/' },
        prep: [
          'Sacar 400 g de chícharos congelados',
          'Picar 1 cebolla',
          'Lavar y cortar en rodajas 3 calabacitas',
          'Rallar el queso parmesano',
        ],
      },
    },
  },
}

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
