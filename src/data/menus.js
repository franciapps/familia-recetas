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
        nombre: 'Pasta Rummo con berenjenas y jitomate',
        descripcion: 'Pasta con berenjenas y jitomate al horno, parmesano rallado e insalada de lechuga y pepino.',
        proteina: null,
        notas: 'Para Franci: pasta bien cocida licuada.',
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
        descripcion: 'Arroz cremoso estilo risotto con el caldo sobrante del chambarete, acelga salteada y carne deshebrada. Parmesano.',
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
        descripcion: 'Pollo asado entero con brócoli y zanahorias al horno. Sobra pollo para el viernes.',
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
        nombre: 'Pescado al horno con zanahorias, calabacitas y chícharos',
        descripcion: 'Pescado blanco al horno con zanahorias, calabacitas y chícharos. Espinacas salteadas.',
        proteina: 'pescado',
        notas: 'Para Franci: licuar todo.',
      },
    },
  },

  2: {
    Lunes: {
      desayuno: 'Porridge de avena Granvita con manzana cocida — para Franci: avena con manzana',
      comida: {
        nombre: 'Chambarete guisado a la mexicana',
        descripcion: 'Chambarete de res guisado lentamente (~2.5 horas) con zanahorias, papas, calabacitas, jitomate, cebolla y ajo. Con arroz y tortillas. Abundante — la carne y el caldo sobran para el martes.',
        proteina: 'res',
        notas: 'Para Franci: pappa de lentejas congelada + zanahorias en puré (sin chambarete). ⚠️ Cocinar SIN SAL. Empezar temprano — cocción ~2.5 horas.',
      },
      cena: {
        nombre: 'Cena ligera: chambarete sobrante y huevos rancheros',
        descripcion: 'Francesca: chambarete + arroz sobrantes. David: huevos rancheros rápidos con queso Murlota. Adri: carne deshebrada + arroz.',
        proteina: 'huevo',
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Pan tostado con queso panela La Huaxtequita y mermelada — para Franci: pan remojado en leche Lala Orgánica',
      comida: {
        nombre: 'Tacos de chambarete con salsa verde',
        descripcion: 'Tacos con la carne deshebrada del chambarete del lunes, salsa verde de tomatillo, aguacate y cebolla. Insalada de jitomate y pepino.',
        proteina: 'res',
        notas: 'Con lo que sobró del lunes. Para Franci: zanahorias/papas del caldo + arroz + un poco de carne fina deshebrada.',
      },
      cena: {
        nombre: 'Pasta Rummo al pesto de chícharos y menta',
        descripcion: 'Pasta con pesto casero de chícharos y menta fresca. Parmesano rallado e insalada mixta.',
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
        notas: 'Para Franci: pappa de lentejas congelada + calabacitas en puré.',
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
        descripcion: 'Ensalada de farro con pollo sobrante del jueves, chícharos, jitomates, pepino, queso oaxaca y aceite de oliva. Con pan.',
        proteina: 'pollo',
        sobrante: true,
        notas: 'Con lo que sobró del jueves. Para Franci: farro picado + pollo en puré + chícharos.',
      },
      cena: {
        nombre: 'Pescado a la veracruzana con papas y brócoli',
        descripcion: 'Pescado blanco guisado con jitomates, aceitunas y alcaparras al estilo veracruzano. Con papas y brócoli.',
        proteina: 'pescado',
        notas: 'Para Franci: licuar todo.',
      },
    },
  },

  3: {
    Lunes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Tinga de hongos',
        descripcion: 'Champiñones deshebrados en salsa de jitomate con cebolla, ajo y chipotle. Con arroz, tortillas y guacamole. Abundante — sobra para la cena y el martes.',
        proteina: null,
        notas: 'Para Franci: pappa de lentejas congelada + arroz en puré (sin chipotle). ⚠️ Cocinar SIN SAL.',
      },
      cena: {
        nombre: 'Cena ligera: tinga sobrante y molletes',
        descripcion: 'Francesca: tinga de hongos + arroz sobrantes. David: molletes (pan + frijoles refritos + queso oaxaca al grill).',
        proteina: null,
        notas: 'Con lo que sobró de la comida.',
      },
    },
    Martes: {
      desayuno: 'Avena cremosa con fruta — para Franci: avena con pera',
      comida: {
        nombre: 'Tortitas de brócoli en salsa verde',
        descripcion: 'Tortitas de brócoli y huevo en salsa verde de tomatillo. Con arroz, frijoles sobrantes e insalada.',
        proteina: 'huevo',
        notas: 'Con lo que sobró del lunes. Para Franci: brócoli y huevo en puré.',
      },
      cena: {
        nombre: 'Tacos de arrachera con cebolla caramelizada y calabacitas',
        descripcion: 'Arrachera marinada a la parrilla con cebolla caramelizada y calabacitas asadas. Guacamole, frijoles, tortillas y salsa. Abundante — sobra para el viernes.',
        proteina: 'res',
        notas: 'Para Franci: arroz + calabacitas en puré + frijoles (sin arrachera para 7m).',
      },
    },
    Miércoles: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Albóndigas de lentejas en caldillo de jitomate',
        descripcion: 'Albóndigas de lentejas en caldillo de jitomate. Con arroz. Abundante — sobra para la cena.',
        proteina: 'legumbres',
        legumbre: 'lentejas',
        remojo: true,
        notas: 'Para Franci: licuar lentejas y salsa (sin sal). ⚠️ Cocinar SIN SAL.',
      },
      cena: {
        nombre: 'Pasta con albóndigas de lentejas y acelga',
        descripcion: 'Pasta con albóndigas de lentejas sobrantes y acelga salteada. Parmesano.',
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
        notas: 'Para Franci: pappa de lentejas congelada + calabacitas.',
      },
      cena: {
        nombre: 'Torta salada de acelga y queso panela La Huaxtequita',
        descripcion: 'Torta salada de acelga y queso panela La Huaxtequita (en lugar de ricotta). Insalada. Sobra para el viernes.',
        proteina: 'huevo',
        notas: 'Para Franci: acelga en puré + pasta (sin queso).',
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Ensalada de farro con arrachera sobrante',
        descripcion: 'Ensalada de farro con arrachera deshebrada sobrante del martes, jitomates, pepino, queso oaxaca y aceite de oliva. Con pan.',
        proteina: 'res',
        sobrante: true,
        notas: 'Con lo que sobró del martes. Para Franci: farro picado + verduras en puré (sin arrachera, sin queso).',
      },
      cena: {
        nombre: 'Pescado en costra de hierbas al horno',
        descripcion: 'Pescado blanco en costra de hierbas al horno. Con papas al horno y brócoli al vapor.',
        proteina: 'pescado',
        notas: 'Para Franci: licuar todo.',
      },
    },
  },
}
