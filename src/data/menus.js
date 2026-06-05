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
        nombre: 'Cena fría: queso panela, aguacate y jitomate con tortillas',
        descripcion: 'Queso panela La Huaxtequita con aguacate, jitomate y tortillas de maíz. Sin cocinar.',
        proteina: null,
        notas: null,
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
        nombre: 'Caldo de chambarete sobrante con arroz y tortilla',
        descripcion: 'Caldo sobrante recalentado con arroz y tortillas de maíz. Sin preparación nueva.',
        proteina: 'res',
        notas: 'Con lo que sobró de la comida. Para Franci: caldo con arroz en puré.',
      },
    },
    Jueves: {
      desayuno: 'Avena cremosa con yogurt y fruta — para Franci: avena con manzana',
      comida: {
        nombre: 'Fideo seco con caldillo de jitomate',
        descripcion: 'Fideos tostados guisados en caldillo de jitomate con cebolla, ajo y zanahoria. Servir con crema, aguacate y limón.',
        proteina: null,
        notas: 'Para Franci: fideo bien cocido licuado (sin crema ni limón).',
      },
      cena: {
        nombre: 'Cena ligera: fruta, yogurt y pan tostado',
        descripcion: 'Fruta de temporada, yogurt natural y pan tostado. Sin cocinar.',
        proteina: null,
        notas: null,
      },
    },
    Viernes: {
      desayuno: 'Hotcakes de sémola y plátano — para Franci: machacado',
      comida: {
        nombre: 'Pollo asado con brócoli y zanahorias al horno',
        descripcion: 'Pollo asado con brócoli y zanahorias al horno. Con arroz y tortillas.',
        proteina: 'pollo',
        notas: 'Para Franci: pollo deshebrado + verduras en puré.',
      },
      cena: {
        nombre: 'Cena ligera: molletes o quesadillas',
        descripcion: 'Pan con frijoles y queso al grill, o quesadillas rápidas. Sin preparación elaborada.',
        proteina: null,
        notas: null,
      },
    },
  },

  2: {
    Lunes: {
      desayuno: 'Porridge de avena Granvita con manzana cocida — para Franci: avena con manzana',
      comida: {
        nombre: 'Pollo al horno con papas, zanahorias y salsa verde',
        descripcion: 'Pollo entero al horno con papas y zanahorias asadas, salsa verde de tomatillo. Con arroz y tortillas. Abundante — sobra pollo para la cena.',
        proteina: 'pollo',
        notas: 'Para Franci: pollo deshebrado + papas y zanahorias en puré. ⚠️ Cocinar SIN SAL.',
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
        nombre: 'Tortitas de espinaca y huevo en salsa de jitomate',
        descripcion: 'Tortitas de espinacas y huevo en salsa de jitomate. Con arroz.',
        proteina: 'huevo',
        notas: 'Para Franci: pappa de lentejas congelada + calabacitas en puré.',
      },
      cena: {
        nombre: 'Cena fría: aguacate, jitomate y queso panela con pan tostado',
        descripcion: 'Aguacate con jitomate, queso panela y pan tostado. Sin cocinar.',
        proteina: null,
        notas: null,
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
        nombre: 'Garbanzos sobrantes con pan tostado y aceite de oliva',
        descripcion: 'Garbanzos sobrantes de la comida con pan tostado, aceite de oliva extra virgen y sal de mar. 🍮 Postre: mamey',
        proteina: 'legumbres',
        notas: 'Con lo que sobró. Para Franci: garbanzos licuados.',
      },
    },
    Jueves: {
      desayuno: 'Yogurt con granola y fruta — para Franci: yogurt con pera en puré',
      comida: {
        nombre: 'Sopa de verduras con arroz',
        descripcion: 'Caldo de verduras con zanahoria, calabacitas, papa, chayote y cebolla. Con arroz y tortillas. 🍮 Postre: mango',
        proteina: null,
        notas: 'Para Franci: verduras en puré con caldo (sin sal).',
      },
      cena: {
        nombre: 'Cena ligera: fruta, yogurt y granola',
        descripcion: 'Fruta de temporada con yogurt natural y granola. Sin cocinar.',
        proteina: null,
        notas: null,
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
        nombre: 'Cena ligera: quesadillas y arroz sobrante',
        descripcion: 'Quesadillas rápidas con queso oaxaca y arroz sobrante. Sin preparación elaborada.',
        proteina: null,
        notas: null,
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
        nombre: 'Cena fría: queso, fruta y pan tostado',
        descripcion: 'Queso panela La Huaxtequita, fruta de temporada y pan tostado. Sin cocinar.',
        proteina: null,
        notas: null,
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
        nombre: 'Albóndigas de res sobrantes con arroz y calabacitas',
        descripcion: 'Albóndigas y caldo sobrante de la comida recalentados, con arroz y calabacitas. 🍮 Postre: zapote negro',
        proteina: 'res',
        notas: 'Con lo que sobró de la comida. Para Franci: caldo con arroz y calabacitas licuadas.',
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
        nombre: 'Cena ligera: aguacate, jitomate y queso panela con tortillas',
        descripcion: 'Aguacate, jitomate y queso panela con tortillas de maíz. Sin cocinar. 🍮 Postre: zapote negro',
        proteina: null,
        notas: null,
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
        nombre: 'Cena ligera: fruta, yogurt y pan tostado',
        descripcion: 'Fruta de temporada, yogurt natural y pan tostado. Sin cocinar.',
        proteina: null,
        notas: null,
      },
    },
  },
}
