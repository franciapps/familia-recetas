// Menú en ciclo de 3 semanas, lunes a viernes.
//
// Reglas:
// - Cada comida y cena tiene carbohidrato + proteína + verdura (campo `plato`).
// - Carne roja máximo 1 vez por semana, en la comida.
// - Pescado siempre el viernes en la cena (Yola y Mari no lo comen). El viernes la comida es de legumbres.
// - Si la comida es de pollo o res, la cena es ligera y vegetariana; si la comida es de legumbres,
//   la cena puede llevar pollo.
// - Cuando la comida lleva salsa, se aparta pollo sin salsa para la cena de Adri (`paraAdri`).
// - Proteínas preferidas: frijoles negros, lentejas y pollo. Las lentejas nunca "a la vista":
//   en tortitas, albóndigas, ragù o crema (a Adri no le gustan enteras).
// - Nada de huevo como proteína principal: ya lo comemos todos los días en el desayuno.
// - Comida: la cocina Yola. Cena: rápida, Bimby o Cucina Botanica,
//   con la verdura ya lavada y cortada por la mañana (`prep`).
//
// Campos:
// proteina: 'pollo' | 'pescado' | 'res' | 'legumbres' | 'queso' — se usa para las alertas
// legumbre: 'frijoles' | 'lentejas' | 'garbanzos' | 'chicharos'
// remojo: true = poner en remojo la noche anterior
// sobrante: true = es comida de un día anterior, no hay que descongelar
// receta: { fuente: 'Bimby' | 'Cucina Botanica', nombre, link }
// prep: lo que la empleada deja listo en la mañana para cocinar la cena rápido
// paraAdri (comida): lo que la empleada aparta para la cena de Adri
// adri (cena): qué cena Adri cuando no come lo mismo; proteinaAdri: su proteína esa noche
// franci: indicación especial para Franci (1 año)

const POLLO_SIN_SALSA = 'Apartar 1 pieza de pollo SIN salsa (o deshebrado sin salsa) para la cena de Adri'

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
        nombre: 'Tortitas de lentejas en caldillo de jitomate',
        descripcion: 'Tortitas de lentejas (lentejas cocidas machacadas con cebolla y pan molido) en caldillo de jitomate. Con arroz y calabacitas. Cocer doble de lentejas: el miércoles se usan en la cena.',
        plato: { carbo: 'Arroz', proteina: 'Lentejas', verdura: 'Calabacitas, jitomate' },
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
        nombre: 'Milanesa de pollo con ensalada, pan y arroz con chícharos',
        descripcion: 'Milanesa de pollo con ensalada de zanahoria, jitomate y pepino. Pan en rebanadas y el arroz con chícharos de ayer. Cocinar también frijoles negros de olla: son para la cena.',
        plato: { carbo: 'Pan, arroz', proteina: 'Pollo', verdura: 'Zanahoria, jitomate, pepino, chícharos' },
        proteina: 'pollo',
        legumbre: 'frijoles',
        remojo: true,
        paraAdri: 'Apartar 1 milanesa para la cena de Adri',
      },
      cena: {
        nombre: 'Cena ligera: camote con chili de frijoles negros',
        descripcion: 'Camote (patata dolce) con chili de frijoles negros (los de la comida), jitomate y pimiento, en el Bimby. Sin chile: picante aparte para los grandes. Adri: la milanesa del mediodía.',
        plato: { carbo: 'Camote', proteina: 'Frijoles negros', verdura: 'Jitomate, pimiento, cebolla' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        sobrante: true,
        ligera: true,
        adri: 'La milanesa que apartaron al mediodía + un poco de camote',
        proteinaAdri: 'pollo',
        receta: { fuente: 'Bimby', nombre: 'Patate dolci e chili di fagioli neri', link: 'https://cookidoo.it/recipes/recipe/it-IT/r699974' },
        prep: [
          'Apartar 2 tazas de frijoles negros de la comida, escurridos',
          'Pelar y cortar en cubos 2 camotes',
          'Picar 1 cebolla, 1 pimiento y 2 jitomates',
        ],
      },
    },
    Jueves: {
      comida: {
        nombre: 'Pollo en salsa verde con calabacitas y papas',
        descripcion: 'Piezas de pollo en salsa de tomate verde con calabacitas y papas. Con arroz y tortillas.',
        plato: { carbo: 'Arroz, papa, tortillas', proteina: 'Pollo', verdura: 'Calabacitas, tomate verde' },
        proteina: 'pollo',
        paraAdri: POLLO_SIN_SALSA,
      },
      cena: {
        nombre: 'Cena ligera: crema de brócoli y quesadillas de queso panela',
        descripcion: 'Crema de brócoli y papa en el Bimby, con quesadillas de queso panela. Adri: el pollo sin salsa del mediodía.',
        plato: { carbo: 'Tortillas, papa', proteina: 'Queso panela', verdura: 'Brócoli' },
        proteina: 'queso',
        ligera: true,
        adri: 'Pollo sin salsa que apartaron al mediodía + crema y quesadilla',
        proteinaAdri: 'pollo',
        prep: [
          'Lavar el brócoli y cortarlo en floretes',
          'Pelar y cortar en trozos 2 papas',
          'Picar media cebolla',
        ],
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
  },

  2: {
    Lunes: {
      comida: {
        nombre: 'Pollo al horno con papas, zanahorias y salsa verde',
        descripcion: 'Pollo al horno con papas y zanahorias asadas, salsa verde de tomatillo aparte y tortillas.',
        plato: { carbo: 'Papas, tortillas', proteina: 'Pollo', verdura: 'Zanahorias, tomate verde' },
        proteina: 'pollo',
        paraAdri: POLLO_SIN_SALSA,
      },
      cena: {
        nombre: 'Cena ligera: crema de lentejas y verduras con pan tostado',
        descripcion: 'Sopa de lentejas con zanahoria, apio, papa y jitomate, licuada en crema (las lentejas no se ven). Con pan tostado.',
        plato: { carbo: 'Pan, papa', proteina: 'Lentejas', verdura: 'Zanahoria, apio, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
        ligera: true,
        adri: 'Si no quiere la crema: el pollo sin salsa del mediodía con pan tostado',
        receta: { fuente: 'Cucina Botanica', nombre: 'Zuppa di lenticchie e verdure (licuarla al final)', link: 'https://www.cucinabotanica.com/ricette/zuppa-di-lenticchie-e-verdure/' },
        prep: [
          'Escurrir las lentejas que se remojaron en la noche',
          'Picar 1 cebolla, 2 zanahorias, 1 rama de apio y 1 papa en cubitos',
          'Picar 2 jitomates',
        ],
      },
    },
    Martes: {
      comida: {
        nombre: 'Tacos de pollo deshebrado con frijoles de olla',
        descripcion: 'Pollo cocido y deshebrado en tortillas, con lechuga, jitomate y aguacate. Frijoles negros de olla aparte. Todo lo cocina Yola. Cocinar doble de frijoles: el jueves se usan en la cena.',
        plato: { carbo: 'Tortillas', proteina: 'Pollo + frijoles negros', verdura: 'Lechuga, jitomate, aguacate' },
        proteina: 'pollo',
        legumbre: 'frijoles',
        remojo: true,
        paraAdri: 'Apartar un poco de pollo deshebrado (sin salsa) para la cena de Adri',
      },
      cena: {
        nombre: 'Cena ligera: pasta con chícharos y queso, calabacitas salteadas',
        descripcion: 'Pasta con crema de chícharos y queso parmesano. Calabacitas salteadas de guarnición.',
        plato: { carbo: 'Pasta', proteina: 'Chícharos + queso', verdura: 'Chícharos, calabacitas' },
        proteina: 'legumbres',
        legumbre: 'chicharos',
        ligera: true,
        adri: 'Pasta con chícharos + el pollo deshebrado del mediodía',
        proteinaAdri: 'pollo',
        receta: { fuente: 'Cucina Botanica', nombre: 'Pasta ai piselli', link: 'https://www.cucinabotanica.com/ricette/pasta-ai-piselli/' },
        prep: [
          'Sacar 400 g de chícharos congelados',
          'Picar 1 cebolla',
          'Lavar y cortar en rodajas 3 calabacitas',
          'Rallar el queso parmesano',
        ],
      },
    },
    Miércoles: {
      comida: {
        nombre: 'Albóndigas de lentejas en salsa de jitomate con arroz y ejotes',
        descripcion: 'Albóndigas de lentejas al horno en salsa de jitomate. Con arroz y ejotes. Las lentejas no se ven.',
        plato: { carbo: 'Arroz', proteina: 'Lentejas', verdura: 'Ejotes, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
        receta: { fuente: 'Cucina Botanica', nombre: 'Polpette di lenticchie al sugo', link: 'https://www.cucinabotanica.com/ricette/polpette-di-lenticchie-al-sugo/' },
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
    Jueves: {
      comida: {
        nombre: 'Bistec en salsa de jitomate con papas y calabacitas',
        descripcion: 'Bistec de res en salsa de jitomate con papas y calabacitas. Con arroz y tortillas. (Carne roja de la semana)',
        plato: { carbo: 'Arroz, papa', proteina: 'Res', verdura: 'Calabacitas, jitomate' },
        proteina: 'res',
      },
      cena: {
        nombre: 'Cena ligera: hamburguesas de arroz y frijoles negros con ensalada',
        descripcion: 'Hamburguesas de frijoles negros y arroz (las dos cosas del martes) al horno, con ensalada y camote al horno.',
        plato: { carbo: 'Arroz, camote', proteina: 'Frijoles negros', verdura: 'Lechuga, jitomate' },
        proteina: 'legumbres',
        legumbre: 'frijoles',
        sobrante: true,
        ligera: true,
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
        nombre: 'Garbanzos guisados con espinacas y zanahoria',
        descripcion: 'Garbanzos con jitomate, zanahoria y espinacas. Con arroz y tortillas.',
        plato: { carbo: 'Arroz, tortillas', proteina: 'Garbanzos', verdura: 'Espinacas, zanahoria, jitomate' },
        proteina: 'legumbres',
        legumbre: 'garbanzos',
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
  },

  3: {
    Lunes: {
      comida: {
        nombre: 'Frijoles negros de olla con arroz y calabacitas con elote',
        descripcion: 'Frijoles negros de olla, arroz, calabacitas con elote y jitomate, tortillas.',
        plato: { carbo: 'Arroz, elote, tortillas', proteina: 'Frijoles negros', verdura: 'Calabacitas, jitomate' },
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
    Martes: {
      comida: {
        nombre: 'Pollo a la jardinera',
        descripcion: 'Pollo guisado en jitomate con zanahoria, chícharos y papa. Con arroz y tortillas.',
        plato: { carbo: 'Arroz, papa', proteina: 'Pollo', verdura: 'Zanahoria, chícharos, jitomate' },
        proteina: 'pollo',
        paraAdri: POLLO_SIN_SALSA,
      },
      cena: {
        nombre: 'Cena ligera: crema de calabaza con pan tostado y queso panela',
        descripcion: 'Crema dorada de calabaza y zanahoria, con pan tostado y queso panela.',
        plato: { carbo: 'Pan tostado', proteina: 'Queso panela', verdura: 'Calabaza, zanahoria' },
        proteina: 'queso',
        ligera: true,
        adri: 'Pollo sin salsa que apartaron al mediodía + crema y pan',
        proteinaAdri: 'pollo',
        receta: { fuente: 'Cucina Botanica', nombre: 'Golden soup', link: 'https://www.cucinabotanica.com/ricette/golden-soup/' },
        prep: [
          'Pelar y cortar en cubos 1 kg de calabaza',
          'Pelar y cortar 2 zanahorias',
          'Picar 1 cebolla y un trocito de jengibre',
        ],
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
        nombre: 'Cena ligera: pasta al ragù de lentejas',
        descripcion: 'Pasta con ragù de lentejas y calabacita rallada en el sugo. Cocer doble de lentejas: el jueves se usan en la comida.',
        plato: { carbo: 'Pasta', proteina: 'Lentejas', verdura: 'Calabacita, zanahoria, jitomate' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
        ligera: true,
        receta: { fuente: 'Cucina Botanica', nombre: 'Pasta al ragù di lenticchie', link: 'https://www.cucinabotanica.com/ricette/pasta-al-rag%C3%B9-di-lenticchie/' },
        prep: [
          'Cocer en olla exprés 500 g de lentejas remojadas (la mitad es para el jueves)',
          'Picar finito 1 cebolla, 1 zanahoria y 1 rama de apio (soffritto)',
          'Rallar 1 calabacita',
        ],
      },
    },
    Jueves: {
      comida: {
        nombre: 'Hamburguesitas de lentejas con puré de papa y ejotes',
        descripcion: 'Hamburguesitas de lentejas (las del miércoles) al horno, con puré de papa y ejotes. Las lentejas no se ven.',
        plato: { carbo: 'Puré de papa', proteina: 'Lentejas', verdura: 'Ejotes' },
        proteina: 'legumbres',
        legumbre: 'lentejas',
        sobrante: true,
      },
      cena: {
        nombre: 'Pollo con verduras salteadas y arroz',
        descripcion: 'Pechuga con pimiento, cebolla y zanahoria, en el Bimby. Con arroz.',
        plato: { carbo: 'Arroz', proteina: 'Pollo', verdura: 'Pimiento, zanahoria, cebolla' },
        proteina: 'pollo',
        receta: { fuente: 'Bimby', nombre: 'Petto di pollo e verdure insaporite', link: 'https://cookidoo.it/recipes/recipe/it-IT/r761403' },
        prep: [
          'Cortar la pechuga en tiras y guardarla tapada en el refri',
          'Lavar y cortar en tiras 2 pimientos, 1 cebolla morada y 1 zanahoria',
          'Lavar el arroz',
        ],
      },
    },
    Viernes: {
      comida: {
        nombre: 'Tacos dorados de frijol negro con sopa de fideo y verduras',
        descripcion: 'Tacos dorados rellenos de frijol negro, con lechuga, jitomate y crema. Sopa de fideo con zanahoria y calabacita.',
        plato: { carbo: 'Tortillas, fideo', proteina: 'Frijoles negros', verdura: 'Lechuga, jitomate, zanahoria, calabacita' },
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
  },
}

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
