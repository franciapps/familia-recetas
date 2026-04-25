// Lista de compras semanales — reescrita con staples fijos, verduras en piezas,
// fruta rotativa, carne/pescado por semana, legumbres por semana,
// despensa cada 3 semanas (S1) y despensa mensual (S1).

export const SHOPPING = {
  1: [
    // Carne / Pescado
    { categoria: 'Carne / Pescado', articulo: 'Chambarete (stinco de res con hueso)', cantidad: '800 g', precio: 100 },
    { categoria: 'Carne / Pescado', articulo: 'Seabass (robalo)', cantidad: '1 kg', precio: 280 },
    { categoria: 'Carne / Pescado', articulo: 'Salmon noruego', cantidad: '400 g', precio: 160 },
    // Huevos / Lácteos
    { categoria: 'Huevos / Lácteos', articulo: 'Huevos Murlota', cantidad: '2 cajas (2 docenas)', precio: 150 },
    { categoria: 'Huevos / Lácteos', articulo: 'Yogurt Flor de Alfalfa', cantidad: '1 kg', precio: 70 },
    { categoria: 'Huevos / Lácteos', articulo: 'Leche Lala Orgánica Blanca', cantidad: '3 L', precio: 80 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso panela La Huaxtequita', cantidad: '1/2 kg', precio: 60 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso oaxaca La Huaxtequita', cantidad: '1/2 kg', precio: 70 },
    // Cereales
    { categoria: 'Cereales', articulo: 'Arroz blanco', cantidad: '2 kg', precio: 50 },
    { categoria: 'Cereales', articulo: 'Granola Dasavena Chocolate', cantidad: '1 bolsa 500g', precio: 150 },
    // Legumbres
    { categoria: 'Legumbres', articulo: 'Frijoles negros secos', cantidad: '1 kg', precio: 40 },
    { categoria: 'Legumbres', articulo: 'Lentejas', cantidad: '500 g', precio: 25 },
    // Verduras
    { categoria: 'Verduras', articulo: 'Zanahorias', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Calabacitas', cantidad: '10 piezas', precio: 45 },
    { categoria: 'Verduras', articulo: 'Jitomate', cantidad: '10 piezas', precio: 50 },
    { categoria: 'Verduras', articulo: 'Cebolla', cantidad: '3 piezas', precio: 20 },
    { categoria: 'Verduras', articulo: 'Aguacate', cantidad: '5 piezas', precio: 80 },
    { categoria: 'Verduras', articulo: 'Lechuga orejona', cantidad: '1 pieza', precio: 25 },
    { categoria: 'Huevos / Lácteos', articulo: 'Chícharos congelados', cantidad: '1 kg', precio: 40 },
    { categoria: 'Verduras', articulo: 'Brócoli', cantidad: '2 piezas', precio: 40 },
    { categoria: 'Verduras', articulo: 'Papas', cantidad: '2 kg', precio: 50 },
    { categoria: 'Verduras', articulo: 'Limones', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Tomate verde (tomatillo)', cantidad: '10 piezas', precio: 20 },
    { categoria: 'Verduras', articulo: 'Ejote', cantidad: '0.5 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Chile serrano', cantidad: '5 piezas', precio: 10 },
    { categoria: 'Verduras', articulo: 'Espinacas', cantidad: '10 manojos', precio: 60 },
    { categoria: 'Verduras', articulo: 'Hierbas (cilantro, perejil, romero, epazote, albahaca)', cantidad: 'manojos surtidos', precio: 40 },
    // Fruta — staples
    { categoria: 'Fruta', articulo: 'Plátanos', cantidad: '12 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Manzanas', cantidad: '12 piezas', precio: 55 },
    { categoria: 'Fruta', articulo: 'Tunas', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Mandarinas', cantidad: '6 piezas', precio: 25 },
    // Fruta rotativa semana 1
    { categoria: 'Fruta', articulo: 'Melón', cantidad: '1 pieza', precio: 50 },
    { categoria: 'Fruta', articulo: 'Uvas', cantidad: '500 g', precio: 60 },
    { categoria: 'Fruta', articulo: 'Zapote negro', cantidad: '2 piezas', precio: 40 },
    // Tortillas
    { categoria: 'Tortillas y Pan', articulo: 'Tortillas de maíz frescas', cantidad: '1 kg', precio: 25 },
    // Despensa cada 3 semanas (solo S1)
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Mantequilla Lurpak', cantidad: '250 g', precio: 80 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Granola Dasavena Chocolate', cantidad: '500 g', precio: 150 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Avena Granvita', cantidad: '500 g', precio: 45 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Pasta Rummo (varios formatos)', cantidad: '5 paquetes', precio: 350 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Frijoles orlotti (cannellini) en lata', cantidad: '3 latas', precio: 120 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Atún Ortiz', cantidad: '1 frasco', precio: 180 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Alcaparras', cantidad: '1 frasco', precio: 70 },
    { categoria: 'Despensa (cada 3 sem)', articulo: 'Anchoas en aceite', cantidad: '1 frasco', precio: 120 },
    // Despensa mensual (solo S1)
    { categoria: 'Despensa (cada mes)', articulo: 'Harina de trigo 00', cantidad: '1 kg', precio: 25 },
    { categoria: 'Despensa (cada mes)', articulo: 'Farro', cantidad: '1 kg', precio: 50 },
  ],

  2: [
    // Carne / Pescado
    { categoria: 'Carne / Pescado', articulo: 'Chambarete (stinco de res con hueso)', cantidad: '1.5 kg', precio: 135 },
    { categoria: 'Carne / Pescado', articulo: 'Seabass (robalo)', cantidad: '1 kg', precio: 280 },
    // Huevos / Lácteos
    { categoria: 'Huevos / Lácteos', articulo: 'Huevos Murlota', cantidad: '2 cajas (2 docenas)', precio: 150 },
    { categoria: 'Huevos / Lácteos', articulo: 'Yogurt Flor de Alfalfa', cantidad: '1 kg', precio: 70 },
    { categoria: 'Huevos / Lácteos', articulo: 'Leche Lala Orgánica Blanca', cantidad: '3 L', precio: 80 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso panela La Huaxtequita', cantidad: '1/2 kg', precio: 60 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso oaxaca La Huaxtequita', cantidad: '1/2 kg', precio: 70 },
    // Cereales
    { categoria: 'Cereales', articulo: 'Arroz blanco', cantidad: '2 kg', precio: 50 },
    { categoria: 'Cereales', articulo: 'Granola Dasavena Chocolate', cantidad: '1 bolsa 500g', precio: 150 },
    // Legumbres
    { categoria: 'Legumbres', articulo: 'Garbanzos secos', cantidad: '500 g', precio: 30 },
    { categoria: 'Legumbres', articulo: 'Frijoles negros secos', cantidad: '1 kg', precio: 40 },
    { categoria: 'Legumbres', articulo: 'Lentejas', cantidad: '500 g', precio: 25 },
    // Verduras
    { categoria: 'Verduras', articulo: 'Zanahorias', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Calabacitas', cantidad: '10 piezas', precio: 45 },
    { categoria: 'Verduras', articulo: 'Jitomate', cantidad: '10 piezas', precio: 50 },
    { categoria: 'Verduras', articulo: 'Cebolla', cantidad: '3 piezas', precio: 20 },
    { categoria: 'Verduras', articulo: 'Aguacate', cantidad: '5 piezas', precio: 80 },
    { categoria: 'Verduras', articulo: 'Lechuga orejona', cantidad: '1 pieza', precio: 25 },
    { categoria: 'Huevos / Lácteos', articulo: 'Chícharos congelados', cantidad: '1 kg', precio: 40 },
    { categoria: 'Verduras', articulo: 'Brócoli', cantidad: '2 piezas', precio: 40 },
    { categoria: 'Verduras', articulo: 'Papas', cantidad: '2 kg', precio: 50 },
    { categoria: 'Verduras', articulo: 'Limones', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Tomate verde (tomatillo)', cantidad: '10 piezas', precio: 20 },
    { categoria: 'Verduras', articulo: 'Ejote', cantidad: '0.5 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Chile serrano', cantidad: '5 piezas', precio: 10 },
    { categoria: 'Verduras', articulo: 'Espinacas', cantidad: '10 manojos', precio: 60 },
    { categoria: 'Verduras', articulo: 'Menta fresca', cantidad: '1 manojo', precio: 10 },
    { categoria: 'Verduras', articulo: 'Hierbas (cilantro, perejil, romero, epazote, albahaca)', cantidad: 'manojos surtidos', precio: 40 },
    // Fruta — staples
    { categoria: 'Fruta', articulo: 'Plátanos', cantidad: '12 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Manzanas', cantidad: '12 piezas', precio: 55 },
    { categoria: 'Fruta', articulo: 'Tunas', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Mandarinas', cantidad: '6 piezas', precio: 25 },
    // Fruta rotativa semana 2
    { categoria: 'Fruta', articulo: 'Sandía', cantidad: '1 pieza mediana', precio: 80 },
    { categoria: 'Fruta', articulo: 'Kiwi', cantidad: '6 piezas', precio: 50 },
    { categoria: 'Fruta', articulo: 'Mamey', cantidad: '1 pieza', precio: 60 },
    // Tortillas
    { categoria: 'Tortillas y Pan', articulo: 'Tortillas de maíz frescas', cantidad: '1 kg', precio: 25 },
  ],

  3: [
    // Carne / Pescado
    { categoria: 'Carne / Pescado', articulo: 'Arrachera (falda de res)', cantidad: '800 g', precio: 240 },
    { categoria: 'Carne / Pescado', articulo: 'Seabass (robalo)', cantidad: '1 kg', precio: 280 },
    // Huevos / Lácteos
    { categoria: 'Huevos / Lácteos', articulo: 'Huevos Murlota', cantidad: '2 cajas (2 docenas)', precio: 150 },
    { categoria: 'Huevos / Lácteos', articulo: 'Yogurt Flor de Alfalfa', cantidad: '1 kg', precio: 70 },
    { categoria: 'Huevos / Lácteos', articulo: 'Leche Lala Orgánica Blanca', cantidad: '3 L', precio: 80 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso panela La Huaxtequita', cantidad: '1/2 kg', precio: 60 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso oaxaca La Huaxtequita', cantidad: '1/2 kg', precio: 70 },
    // Cereales
    { categoria: 'Cereales', articulo: 'Arroz blanco', cantidad: '2 kg', precio: 50 },
    { categoria: 'Cereales', articulo: 'Granola Dasavena Chocolate', cantidad: '1 bolsa 500g', precio: 150 },
    // Legumbres
    { categoria: 'Legumbres', articulo: 'Lentejas', cantidad: '1 kg', precio: 45 },
    { categoria: 'Legumbres', articulo: 'Frijoles negros secos', cantidad: '1 kg', precio: 40 },
    // Verduras
    { categoria: 'Verduras', articulo: 'Zanahorias', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Calabacitas', cantidad: '10 piezas', precio: 45 },
    { categoria: 'Verduras', articulo: 'Jitomate', cantidad: '10 piezas', precio: 50 },
    { categoria: 'Verduras', articulo: 'Cebolla', cantidad: '3 piezas', precio: 20 },
    { categoria: 'Verduras', articulo: 'Aguacate', cantidad: '5 piezas', precio: 80 },
    { categoria: 'Verduras', articulo: 'Lechuga orejona', cantidad: '1 pieza', precio: 25 },
    { categoria: 'Huevos / Lácteos', articulo: 'Chícharos congelados', cantidad: '1 kg', precio: 40 },
    { categoria: 'Verduras', articulo: 'Brócoli', cantidad: '2 piezas', precio: 40 },
    { categoria: 'Verduras', articulo: 'Papas', cantidad: '2 kg', precio: 50 },
    { categoria: 'Verduras', articulo: 'Limones', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Tomate verde (tomatillo)', cantidad: '10 piezas', precio: 20 },
    { categoria: 'Verduras', articulo: 'Ejote', cantidad: '0.5 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Chile serrano', cantidad: '5 piezas', precio: 10 },
    { categoria: 'Verduras', articulo: 'Espinacas', cantidad: '10 manojos', precio: 60 },
    { categoria: 'Verduras', articulo: 'Menta fresca', cantidad: '1 manojo', precio: 10 },
    { categoria: 'Verduras', articulo: 'Hierbas (cilantro, perejil, romero, epazote, albahaca)', cantidad: 'manojos surtidos', precio: 40 },
    // Fruta — staples
    { categoria: 'Fruta', articulo: 'Plátanos', cantidad: '12 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Manzanas', cantidad: '12 piezas', precio: 55 },
    { categoria: 'Fruta', articulo: 'Tunas', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Mandarinas', cantidad: '6 piezas', precio: 25 },
    // Fruta rotativa semana 3
    { categoria: 'Fruta', articulo: 'Papaya', cantidad: '1 pieza mediana', precio: 60 },
    { categoria: 'Fruta', articulo: 'Uvas', cantidad: '500 g', precio: 60 },
    { categoria: 'Fruta', articulo: 'Kiwi', cantidad: '6 piezas', precio: 50 },
    { categoria: 'Fruta', articulo: 'Mango', cantidad: '3 piezas', precio: 45 },
    // Tortillas
    { categoria: 'Tortillas y Pan', articulo: 'Tortillas de maíz frescas', cantidad: '1.5 kg', precio: 40 },
  ],
}

export const PANTRY = [
  // Cereales / Pasta
  { categoria: 'Cereales / Pasta', articulo: 'Arroz blanco', cantidad: '2 kg', precio: 50 },
  { categoria: 'Cereales / Pasta', articulo: 'Pasta Rummo (varios formatos)', cantidad: '5 paquetes', precio: 350 },
  { categoria: 'Cereales / Pasta', articulo: 'Fideo seco', cantidad: '500 g', precio: 20 },
  { categoria: 'Cereales / Pasta', articulo: 'Farro', cantidad: '1 kg', precio: 50 },
  { categoria: 'Cereales / Pasta', articulo: 'Avena Granvita', cantidad: '500 g', precio: 45 },
  { categoria: 'Cereales / Pasta', articulo: 'Harina de trigo 00', cantidad: '1 kg', precio: 25 },
  { categoria: 'Cereales / Pasta', articulo: 'Sémola rimacinata', cantidad: '500 g', precio: 30 },
  { categoria: 'Cereales / Pasta', articulo: 'Tortillas de maíz (inicio)', cantidad: '1 kg', precio: 25 },
  { categoria: 'Cereales / Pasta', articulo: 'Tortillas de harina', cantidad: '2 paquetes', precio: 60 },
  { categoria: 'Cereales / Pasta', articulo: 'Totopos / tortilla chips', cantidad: '2 bolsas', precio: 60 },
  { categoria: 'Cereales / Pasta', articulo: 'Pan molido', cantidad: '250 g', precio: 20 },
  // Legumbres Secas
  { categoria: 'Legumbres Secas', articulo: 'Frijoles negros', cantidad: '1 kg', precio: 40 },
  { categoria: 'Legumbres Secas', articulo: 'Frijoles pintos / bayos', cantidad: '1 kg', precio: 35 },
  { categoria: 'Legumbres Secas', articulo: 'Garbanzos secos', cantidad: '500 g', precio: 30 },
  { categoria: 'Legumbres Secas', articulo: 'Lentejas', cantidad: '1 kg', precio: 45 },
  { categoria: 'Legumbres Secas', articulo: 'Chícharos congelados', cantidad: '1 kg', precio: 40 },
  // Conservas
  { categoria: 'Conservas', articulo: 'Passata di pomodoro', cantidad: '3 botellas', precio: 150 },
  { categoria: 'Conservas', articulo: 'Polpa di pomodoro', cantidad: '500 g', precio: 25 },
  { categoria: 'Conservas', articulo: 'Frijoles orlotti (cannellini) en lata', cantidad: '3 latas', precio: 120 },
  { categoria: 'Conservas', articulo: 'Atún Ortiz', cantidad: '1 frasco', precio: 180 },
  { categoria: 'Conservas', articulo: 'Aceitunas verdes sin hueso', cantidad: '400 g', precio: 100 },
  { categoria: 'Conservas', articulo: 'Aceitunas negras', cantidad: '200 g', precio: 60 },
  { categoria: 'Conservas', articulo: 'Alcaparras en sal', cantidad: '1 frasco', precio: 70 },
  { categoria: 'Conservas', articulo: 'Anchoas en aceite', cantidad: '1 frasco', precio: 120 },
  // Condimentos
  { categoria: 'Condimentos', articulo: 'Aceite de oliva extra virgen (EVO)', cantidad: '1 L', precio: 250 },
  { categoria: 'Condimentos', articulo: 'Aceite de maíz o girasol', cantidad: '1 L', precio: 60 },
  { categoria: 'Condimentos', articulo: 'Mantequilla Lurpak', cantidad: '250 g', precio: 80 },
  { categoria: 'Condimentos', articulo: 'Vinagre', cantidad: '1 botella', precio: 25 },
  { categoria: 'Condimentos', articulo: 'Sal, pimienta y especias (comino, páprika, epazote, orégano)', cantidad: 'surtido', precio: 100 },
  { categoria: 'Condimentos', articulo: 'Lievito per torta salata', cantidad: '1 sobre', precio: 30 },
  // Secos Varios
  { categoria: 'Secos Varios', articulo: 'Piñones (para pesto)', cantidad: '50 g', precio: 80 },
  { categoria: 'Secos Varios', articulo: 'Nueces', cantidad: '200 g', precio: 150 },
  { categoria: 'Secos Varios', articulo: 'Uvetta', cantidad: '200 g', precio: 50 },
  { categoria: 'Secos Varios', articulo: 'Miele', cantidad: '1 frasco', precio: 80 },
  { categoria: 'Secos Varios', articulo: 'Marmellata', cantidad: '1 frasco', precio: 60 },
  { categoria: 'Secos Varios', articulo: 'Granola Dasavena Chocolate', cantidad: '500 g', precio: 150 },
]
