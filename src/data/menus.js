// Semana = 1, 2 o 3; día = 'Lunes'/'Martes'/'Miércoles'/'Jueves'/'Viernes'
// proteina: 'pollo' | 'pescado' | 'legumbres' | 'res' | 'cerdo' | 'huevo' | null
// legumbre (solo si proteina === 'legumbres'): 'lentejas' | 'frijoles' | 'garbanzos'

export const MENUS = {
  1: {
    Lunes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: igual pero machacado',
      comida: {
        nombre: 'Frijoles de olla con espinacas, zanahorias y jitomate',
        descripcion: 'Frijoles de olla abundantes con espinacas, zanahorias y jitomate, acompañados de arroz y tortillas. Sobra para la cena y el martes.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        notas: 'Para Franci: papilla de lentejas congelada + zanahorias en puré. Cocinar en cantidad para que sobre.',
      },
      cena: {
        nombre: 'Cena rápida de frijoles con quesadilla',
        descripcion: 'Francesca: frijoles + arroz sobrantes. David: quesadilla con queso oaxaca. Adri: frijoles + arroz.',
        proteina: 'legumbres',
        notas: 'Con lo que sobró de la comida. Fácil y rápido.',
      },
    },
    Martes: {
      desayuno: 'Avena cremosa con yogurt y fruta — para Franci: avena con pera',
      comida: {
        nombre: 'Calabacitas con elote',
        descripcion: 'Calabacitas, elote, jitomate y cebolla salteados. Con arroz, frijoles refritos de los frijoles del lunes y tortilla.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        notas: 'Con lo que sobró del lunes. Para Franci: calabacitas, elote y frijoles en puré.',
      },
      cena: {
        nombre: 'Pasta con berenjenas y jitomate',
        descripcion: 'Pasta italiana con berenjenas y jitomate al horno, parmesano rallado e insalata de lechuga y pepino.',
        proteina: null,
        notas: 'Para Franci: pasta bien cocida en puré.',
      },
    },
    Miércoles: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Lentejas guisadas a la mexicana',
        descripcion: 'Lentejas guisadas con zanahorias, espinacas y jitomate al estilo mexicano. Con arroz. Abundante y económico.',
        proteina: 'legumbres',
        legumbre: 'lentejas',
        notas: 'Para Franci: licuar la sopa (sin sal). Sobra para la cena.',
      },
      cena: {
        nombre: 'Pasta al ragú de lentejas con acelgas',
        descripcion: 'Pasta con ragú de lentejas sobrantes de la comida. Con acelgas (acelga) salteadas y parmesano.',
        proteina: 'legumbres',
        notas: 'Con lo que sobró de la comida. Para Franci: licuar.',
      },
    },
    Jueves: {
      desayuno: 'Avena cremosa con yogurt y fruta — para Franci: avena con manzana',
      comida: {
        nombre: 'Sopa de fideo',
        descripcion: 'Sopa de fideo seco guisado con caldillo de jitomate, zanahoria, cebolla y ajo. Servir con limón y aguacate.',
        proteina: null,
        notas: 'Para Franci: sopa bien cocida licuada (sin limón). Abundante para que sobre.',
      },
      cena: {
        nombre: 'Pollo asado con brócoli y zanahorias al horno',
        descripcion: 'Pollo asado entero con brócoli y zanahorias al horno. Sobra pollo para el viernes.',
        proteina: 'pollo',
        notas: 'Para Franci: licuar pollo y verduras. Guardar pollo sobrante para el viernes.',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Tacos de pollo sobrante con salsa verde',
        descripcion: 'Tacos de pollo sobrante del jueves con salsa verde de tomatillo, aguacate y cebolla. Insalata de pepino.',
        proteina: 'pollo',
        notas: 'Con lo que sobró del jueves. Para Franci: pollo deshebrado + aguacate + arroz. Comprar queso panela y acelga extra para la semana 3.',
      },
      cena: {
        nombre: 'Pescado al horno con zanahorias, calabacitas y chícharos',
        descripcion: 'Pescado blanco al horno con zanahorias, calabacitas y chícharos. Espinacas salteadas.',
        proteina: 'pescado',
        notas: 'Para Franci: licuar todo. Día de lista del súper.',
      },
    },
  },

  2: {
    Lunes: {
      desayuno: 'Porridge de avena con manzana cocida — para Franci: avena con manzana',
      comida: {
        nombre: 'Frijoles negros guisados',
        descripcion: 'Frijoles negros guisados con zanahorias, jitomate, cebolla y epazote. Con arroz y tortillas. Abundante — base para enfrijoladas del martes.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        notas: 'Para Franci: papilla de lentejas congelada + zanahorias. Cocinar mucho para que sobre.',
      },
      cena: {
        nombre: 'Cena ligera con huevos rancheros',
        descripcion: 'Francesca: frijoles + arroz sobrantes. David: huevos rancheros rápidos. Adri: porción de frijoles y arroz.',
        proteina: 'huevo',
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Pan tostado con queso panela y mermelada — para Franci: pan remojado en leche',
      comida: {
        nombre: 'Enfrijoladas',
        descripcion: 'Tortillas bañadas en salsa de frijoles negros licuados con queso oaxaca. Insalata de jitomate y pepino.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        notas: 'Con lo que sobró del lunes. Para Franci: frijoles licuados + arroz (sin queso).',
      },
      cena: {
        nombre: 'Pasta al pesto de chícharos y hierbabuena',
        descripcion: 'Pasta italiana con pesto de chícharos y hierbabuena. Parmesano rallado e insalata mixta.',
        proteina: null,
        notas: 'Para Franci: licuar. Receta de cocina casera.',
      },
    },
    Miércoles: {
      desayuno: 'Porridge de avena y plátano — para Franci: avena con plátano',
      comida: {
        nombre: 'Guisado de garbanzo con zanahorias y espinacas',
        descripcion: 'Garbanzos guisados con zanahorias, espinacas y jitomate. Con arroz. Abundante.',
        proteina: 'legumbres',
        legumbre: 'garbanzos',
        notas: 'Para Franci: licuar garbanzos y verduras (sin sal). Sobra para la cena.',
      },
      cena: {
        nombre: 'Pasta e ceci (pasta con garbanzos)',
        descripcion: 'Pasta con garbanzos sobrantes de la comida. Con crostini y aceite de oliva extra virgen.',
        proteina: 'legumbres',
        notas: 'Con lo que sobró. Para Franci: licuar.',
      },
    },
    Jueves: {
      desayuno: 'Yogurt con granola y fruta — para Franci: yogurt con pera en puré',
      comida: {
        nombre: 'Tortitas de espinaca en salsa de jitomate',
        descripcion: 'Tortitas de espinacas y huevo en salsa de jitomate. Con arroz.',
        proteina: 'huevo',
        notas: 'Para Franci: papilla de lentejas congelada + calabacitas en puré.',
      },
      cena: {
        nombre: 'Pollo al limón y romero con papas y calabacitas',
        descripcion: 'Pollo al limón y romero con papas al horno y calabacitas a la plancha. Sobra pollo para el viernes.',
        proteina: 'pollo',
        notas: 'Para Franci: licuar. Guardar pollo sobrante.',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de avena y plátano — para Franci: machacado',
      comida: {
        nombre: 'Ensalada de farro con pollo sobrante',
        descripcion: 'Ensalada de farro con pollo sobrante del jueves, chícharos, jitomates cherry, pepino, queso oaxaca y aceite de oliva. Con pan.',
        proteina: 'pollo',
        notas: 'Con lo que sobró del jueves. Para Franci: farro picado + pollo en puré + chícharos. Comprar garbanzos secos y acelga para la semana 3.',
      },
      cena: {
        nombre: 'Pescado a la veracruzana con papas y brócoli',
        descripcion: 'Pescado blanco guisado con jitomates cherry, aceitunas y alcaparras (pescado a la veracruzana). Con papas y brócoli.',
        proteina: 'pescado',
        notas: 'Para Franci: licuar todo. Día de lista del súper.',
      },
    },
  },

  3: {
    Lunes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Sopa azteca',
        descripcion: 'Sopa de tortilla con frijoles negros, aguacate y queso oaxaca. Con arroz. Abundante.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        notas: 'Para Franci: papilla de lentejas congelada + zanahorias (sin chile ni queso). Sobra sopa.',
      },
      cena: {
        nombre: 'Cena ligera: molletes y sopa sobrante',
        descripcion: 'Francesca: sopa azteca sobrante. David: molletes (pan + frijoles refritos + queso oaxaca al grill).',
        proteina: 'legumbres',
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Avena cremosa con fruta — para Franci: avena con pera',
      comida: {
        nombre: 'Tortitas de brócoli en salsa verde',
        descripcion: 'Tortitas de brócoli y huevo en salsa verde de tomatillo. Con arroz, frijoles sobrantes e insalata.',
        proteina: 'huevo',
        notas: 'Con lo que sobró del lunes. Para Franci: brócoli y huevo en puré.',
      },
      cena: {
        nombre: 'Guisado de pollo con aceitunas y jitomate',
        descripcion: 'Pollo guisado con aceitunas y jitomate (spezzatino). Con polenta o arroz e insalata. Sobra pollo.',
        proteina: 'pollo',
        notas: 'Para Franci: licuar.',
      },
    },
    Miércoles: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Albóndigas de lenticchie en caldillo de jitomate',
        descripcion: 'Albóndigas de lentejas en caldillo de jitomate. Con arroz. Abundante, sobra para la cena.',
        proteina: 'legumbres',
        legumbre: 'lentejas',
        notas: 'Para Franci: licuar lentejas y salsa (sin sal). Sobra para la cena.',
      },
      cena: {
        nombre: 'Pasta con albóndigas de lentejas y acelgas',
        descripcion: 'Pasta con albóndigas de lentejas sobrantes y acelgas salteadas. Parmesano.',
        proteina: 'legumbres',
        notas: 'Con lo que sobró de la comida. Para Franci: licuar.',
      },
    },
    Jueves: {
      desayuno: 'Avena con yogurt y fruta — para Franci: avena con manzana',
      comida: {
        nombre: 'Huevos a la mexicana con frijoles refritos',
        descripcion: 'Huevos a la mexicana (revueltos con jitomate y cebolla). Frijoles refritos y tortilla.',
        proteina: 'huevo',
        notas: 'Para Franci: papilla de lentejas congelada + calabacitas.',
      },
      cena: {
        nombre: 'Tarta salada de acelgas y queso panela',
        descripcion: 'Tarta salada de acelgas y queso panela (receta casera, panela en lugar de ricotta). Insalata.',
        proteina: 'huevo',
        notas: 'Para Franci: acelgas en puré + pasta (sin queso). Sobra tarta para el viernes.',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Tarta salada sobrante con ensalada de farro',
        descripcion: 'Tarta salada sobrante del jueves + ensalada de farro con chícharos, jitomates cherry, pepino y aceite de oliva.',
        proteina: 'huevo',
        notas: 'Con lo que sobró. Para Franci: farro picado + verduras en puré (sin queso).',
      },
      cena: {
        nombre: 'Pescado en costra de hierbas al horno',
        descripcion: 'Pescado blanco en costra de hierbas al horno. Con papas al horno y brócoli al vapor.',
        proteina: 'pescado',
        notas: 'Para Franci: licuar todo. Día de lista del súper.',
      },
    },
  },
}
