// Semana = 1, 2 o 3; día = 'Lunes'/'Martes'/'Miércoles'/'Jueves'/'Viernes'
// proteina: 'pollo' | 'pescado' | 'legumbres' | 'res' | 'huevo' | null
// legumbre (solo si proteina === 'legumbres'): 'lentejas' | 'frijoles' | 'garbanzos'
// remojo: true = hay que poner en remojo la noche anterior

export const MENUS = {
  1: {
    Lunes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: igual pero machacado',
      comida: {
        nombre: 'Frijoles de olla con espinacas, zanahorias y jitomate',
        descripcion: 'Frijoles de olla abundantes con espinacas, zanahorias y jitomate. Con arroz y tortillas. Abundante — sobra para la cena y el martes.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: true,
        notas: 'Para Franci: pappa de lentejas congelada + zanahorias en puré. Cocinar en cantidad para que sobre. ⚠️ Cocinar SIN SAL — cada quien agrega la suya.',
      },
      cena: {
        nombre: 'Cena rápida: frijoles sobrantes y quesadilla',
        descripcion: 'Francesca: frijoles + arroz sobrantes. David: quesadilla con queso oaxaca. Adri: frijoles + arroz.',
        proteina: 'legumbres',
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Avena cremosa con yogurt y fruta — para Franci: avena con pera',
      comida: {
        nombre: 'Calabacitas con elote y frijoles refritos',
        descripcion: 'Calabacitas, elote, jitomate y cebolla salteados. Con arroz, frijoles refritos del lunes y tortilla.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: false,
        notas: 'Con lo que sobró del lunes. Para Franci: calabacitas, elote y frijoles en puré.',
      },
      cena: {
        nombre: 'Salmon noruego al horno con espinacas y limón',
        descripcion: 'Salmon noruego al horno con limón, aceite de oliva y eneldo. Con espinacas salteadas y arroz blanco. 🍮 Postre: mango',
        proteina: 'pescado',
        notas: 'Para Franci: salmon sin sal, bien cocido, desmigado. Eliminar espinas.',
      },
    },
    Miércoles: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Caldo de chambarete',
        descripcion: 'Chambarete de res en caldo abundante con zanahorias, papas, calabacitas, elote, cebolla y cilantro. Con arroz, tortillas, limón y salsa. El caldo y la carne sobran para la cena.',
        proteina: 'res',
        notas: 'Para Franci: caldo sin sal + zanahorias y papas en puré (sin carne todavía). ⚠️ Cocinar SIN SAL.',
      },
      cena: {
        nombre: 'Risotto al caldo de chambarete con acelga y carne deshebrada',
        descripcion: 'Arroz cremoso estilo risotto con el caldo sobrante del chambarete, acelga salteada y carne deshebrada. 🍮 Postre: mango',
        proteina: 'res',
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
        descripcion: 'Pollo asado entero con brócoli y zanahorias al horno. Sobra pollo para el viernes. 🍮 Postre: zapote negro',
        proteina: 'pollo',
        notas: 'Para Franci: licuar pollo y verduras. Guardar pollo sobrante para el viernes.',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Tacos de pollo sobrante con salsa verde',
        descripcion: 'Tacos de pollo sobrante del jueves con salsa verde de tomatillo, aguacate y cebolla. Insalada de pepino.',
        proteina: 'pollo',
        sobrante: true,
        notas: 'Con lo que sobró del jueves. Para Franci: pollo deshebrado + aguacate + arroz.',
      },
      cena: {
        nombre: 'Pasta ai piselli (Cucina Botanica)',
        descripcion: 'Pasta cremosa con piselli freschi, menta e limone. Ricetta vegana leggera e profumata.',
        proteina: null,
        cbLink: 'https://www.cucinabotanica.com/ricette/pasta-ai-piselli/',
        notas: 'Para Franci: pasta bien cocida con piselli licuados.',
      },
    },
  },

  2: {
    Lunes: {
      desayuno: 'Porridge de avena Granvita con manzana cocida — para Franci: avena con manzana',
      comida: {
        nombre: 'Pollo al horno con papas, zanahorias y salsa verde',
        descripcion: 'Pollo entero al horno con papas y zanahorias asadas, salsa verde de tomatillo. Con arroz y tortillas. Abundante — sobra pollo para el martes.',
        proteina: 'pollo',
        notas: 'Para Franci: pollo deshebrado + papas y zanahorias en puré. ⚠️ Cocinar SIN SAL. Guardar pollo sobrante para el martes.',
      },
      cena: {
        nombre: 'Cena ligera: pollo sobrante y quesadillas',
        descripcion: 'Pollo sobrante del horno con arroz. David: quesadilla con queso oaxaca. 🍮 Postre: mamey',
        proteina: 'pollo',
        sobrante: true,
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Pan tostado con queso panela La Huaxtequita y mermelada — para Franci: pan remojado en leche Lala Orgánica',
      comida: {
        nombre: 'Tacos de pollo sobrante con salsa verde',
        descripcion: 'Tacos con el pollo deshebrado del lunes, salsa verde de tomatillo, aguacate y cebolla. Insalada de jitomate y pepino.',
        proteina: 'pollo',
        sobrante: true,
        notas: 'Con lo que sobró del lunes. Para Franci: pollo deshebrado + arroz + aguacate.',
      },
      cena: {
        nombre: 'Pasta Rummo al pesto de chícharos y menta',
        descripcion: 'Pasta con pesto casero de chícharos y menta fresca. Insalada mixta.',
        proteina: null,
        notas: 'Para Franci: licuar.',
      },
    },
    Miércoles: {
      desayuno: 'Porridge de avena y plátano — para Franci: avena con plátano',
      comida: {
        nombre: 'Guisado de garbanzo con zanahorias y espinacas',
        descripcion: 'Garbanzos guisados con zanahorias, espinacas y jitomate. Con arroz. Abundante — sobra para la cena.',
        proteina: 'legumbres',
        legumbre: 'garbanzos',
        remojo: true,
        notas: 'Para Franci: licuar garbanzos y verduras (sin sal). ⚠️ Cocinar SIN SAL.',
      },
      cena: {
        nombre: 'Pasta e ceci (pasta con garbanzos)',
        descripcion: 'Pasta con garbanzos sobrantes de la comida. Con crostini y aceite de oliva extra virgen. 🍮 Postre: mamey',
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
        notas: 'Para Franci: pappa de lentejas congelada + calabacitas en puré.',
      },
      cena: {
        nombre: 'Seabass al horno con espinacas y limón',
        descripcion: 'Seabass (robalo) al horno con espinacas salteadas, limón y aceite de oliva. Con arroz blanco. 🍮 Postre: mango',
        proteina: 'pescado',
        notas: 'Para Franci: seabass desmigado sin espinas + arroz + espinacas en puré.',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de avena y plátano — para Franci: machacado',
      comida: {
        nombre: 'Tacos de frijoles refritos con queso oaxaca y guacamole',
        descripcion: 'Tacos de frijoles refritos con queso oaxaca derretido, guacamole y jitomate. Con arroz.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: false,
        notas: 'Usar frijoles de lata o sobrantes. Para Franci: frijoles + arroz en puré + aguacate.',
      },
      cena: {
        nombre: 'Pasta con pomodori e cannellini (Cucina Botanica)',
        descripcion: 'Pasta con jitomates frescos y frijoles cannellini (orlotti). Ricetta semplice e sostanziosa.',
        proteina: 'legumbres',
        legumbre: 'frijoles',
        remojo: true,
        cbLink: 'https://www.cucinabotanica.com/ricette/pasta-con-pomodori-e-cannellini/',
        notas: 'OJO: poner cannellini (orlotti) en remojo la noche del jueves. Cocinarlos en olla express al mediodía del viernes. Para Franci: pasta licuada con frijoles. ⚠️ Poner cannellini en remojo el JUEVES por la noche para cocinar en olla express el viernes al mediodía.',
      },
    },
  },

  3: {
    Lunes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Sopa de lentejas con zanahoria y jitomate',
        descripcion: 'Lentejas en caldo con zanahoria, jitomate, cebolla y ajo. Con arroz blanco y calabacitas guisadas. Abundante — sobra para la cena.',
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: false,
        notas: 'Para Franci: lentejas licuadas con zanahoria (sin sal). ⚠️ Cocinar SIN SAL.',
      },
      cena: {
        nombre: 'Cena ligera: molletes y guacamole',
        descripcion: 'David: molletes (pan + frijoles refritos + queso oaxaca al grill). Adri: arroz + frijoles sobrantes. 🍮 Postre: mango',
        proteina: null,
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Avena cremosa con fruta — para Franci: avena con pera',
      comida: {
        nombre: 'Tortitas de brócoli en salsa verde',
        descripcion: 'Tortitas de brócoli y huevo en salsa verde de tomatillo. Con arroz, frijoles refritos e insalada.',
        proteina: 'huevo',
        notas: 'Para Franci: brócoli y huevo en puré.',
      },
      cena: {
        nombre: 'Seabass al horno con limón y espinacas',
        descripcion: 'Seabass (robalo) al horno con limón, aceite de oliva y hierbas. Con espinacas salteadas y arroz blanco.',
        proteina: 'pescado',
        notas: 'Para Franci: seabass desmigado sin espinas + arroz + espinacas en puré.',
      },
    },
    Miércoles: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Albóndigas de res en caldillo de jitomate',
        descripcion: 'Albóndigas de res en caldillo de jitomate con zanahoria y calabacitas. Con arroz. Abundante — sobra para la cena.',
        proteina: 'res',
        notas: 'Para Franci: caldo + zanahoria en puré (sin albóndiga todavía). ⚠️ Cocinar SIN SAL.',
      },
      cena: {
        nombre: 'Pasta con albóndigas de res y acelga',
        descripcion: 'Pasta con albóndigas de res sobrantes y acelga salteada. 🍮 Postre: zapote negro',
        proteina: 'res',
        notas: 'Con lo que sobró de la comida. Para Franci: pasta con caldo y acelga licuada.',
      },
    },
    Jueves: {
      desayuno: 'Avena con yogurt y fruta — para Franci: avena con manzana',
      comida: {
        nombre: 'Sopa de fideo con verduras',
        descripcion: 'Sopa de fideo seco guisado con caldillo de jitomate, zanahoria, calabacitas y cebolla. Servir con limón y aguacate.',
        proteina: null,
        notas: 'Para Franci: sopa bien cocida licuada (sin limón).',
      },
      cena: {
        nombre: 'Torta salada de acelga y queso panela La Huaxtequita',
        descripcion: 'Torta salada de acelga y queso panela La Huaxtequita (en lugar de ricotta). Insalada. Sobra para el viernes. 🍮 Postre: zapote negro',
        proteina: 'huevo',
        notas: 'Para Franci: acelga en puré + pasta (sin queso).',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Tacos de papa con queso panela y salsa verde',
        descripcion: 'Tacos de papa cocida desmenuzada con queso panela La Huaxtequita y salsa verde de tomatillo. Con arroz y frijoles.',
        proteina: null,
        notas: 'Para Franci: papa y frijoles en puré + arroz.',
      },
      cena: {
        nombre: 'Pasta ai broccoli con alici (Cucina Botanica)',
        descripcion: 'Pasta con brócoli, anchoas y ajo. Sabor intenso y reconfortante. Receta adaptada de Cucina Botanica.',
        proteina: null,
        cbLink: 'https://www.cucinabotanica.com/ricette/pasta-ai-broccoli/',
        notas: 'Agregar anchoas al sofrito con ajo. Para Franci: pasta con brócoli licuado (sin anchoas).',
      },
    },
  },
}
