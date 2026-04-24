// Lista de compras semanales (solo frescos) — extraída de las hojas Spesa S1/S2/S3
// La despensa (Dispensa) se compra una sola vez al inicio

export const SHOPPING = {
  1: [
    // Carne / Pescado
    { categoria: 'Carne / Pescado', articulo: 'Pollo entero (~1.5 kg)', cantidad: '1.5 kg', precio: 180 },
    { categoria: 'Carne / Pescado', articulo: 'Pescado blanco (huachinango o mojarra)', cantidad: '1 kg', precio: 280 },
    // Huevos / Lácteos
    { categoria: 'Huevos / Lácteos', articulo: 'Huevos', cantidad: '1 docena', precio: 50 },
    { categoria: 'Huevos / Lácteos', articulo: 'Parmesano reggiano', cantidad: '150 g', precio: 90 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso oaxaca', cantidad: '200 g', precio: 35 },
    { categoria: 'Huevos / Lácteos', articulo: 'Yogurt Flor de Alfalfa', cantidad: '1 kg', precio: 45 },
    { categoria: 'Huevos / Lácteos', articulo: 'Leche Lala Orgánica Blanca', cantidad: '2 L', precio: 55 },
    // Verduras
    { categoria: 'Verduras', articulo: 'Zanahorias', cantidad: '1.5 kg', precio: 30 },
    { categoria: 'Verduras', articulo: 'Calabacitas', cantidad: '1.5 kg', precio: 45 },
    { categoria: 'Verduras', articulo: 'Brócoli', cantidad: '1 kg', precio: 40 },
    { categoria: 'Verduras', articulo: 'Espinacas', cantidad: '2 manojos', precio: 60 },
    { categoria: 'Verduras', articulo: 'Acelgas', cantidad: '1 manojo', precio: 20 },
    { categoria: 'Verduras', articulo: 'Berenjenas', cantidad: '2 medianas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Jitomate', cantidad: '3 kg', precio: 75 },
    { categoria: 'Verduras', articulo: 'Tomate verde (tomatillo)', cantidad: '500 g', precio: 15 },
    { categoria: 'Verduras', articulo: 'Cebolla', cantidad: '1.5 kg', precio: 30 },
    { categoria: 'Verduras', articulo: 'Ajo', cantidad: '1 cabeza', precio: 10 },
    { categoria: 'Verduras', articulo: 'Pepino', cantidad: '3 piezas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Aguacate', cantidad: '5 piezas', precio: 80 },
    { categoria: 'Verduras', articulo: 'Lechuga', cantidad: '2 piezas', precio: 40 },
    { categoria: 'Verduras', articulo: 'Elote fresco o congelado', cantidad: '500 g', precio: 30 },
    { categoria: 'Verduras', articulo: 'Papas', cantidad: '2 kg', precio: 50 },
    { categoria: 'Verduras', articulo: 'Limones', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Hierbas (cilantro, perejil, romero, epazote, albahaca)', cantidad: 'manojos', precio: 40 },
    // Fruta
    { categoria: 'Fruta', articulo: 'Plátanos', cantidad: '8 piezas', precio: 25 },
    { categoria: 'Fruta', articulo: 'Manzanas', cantidad: '12 piezas', precio: 55 },
    { categoria: 'Fruta', articulo: 'Tunas', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Melón', cantidad: '1 pieza', precio: 50 },
    { categoria: 'Fruta', articulo: 'Uvas', cantidad: '500 g', precio: 60 },
    // Tortillas y pan
    { categoria: 'Tortillas y Pan', articulo: 'Tortillas de maíz frescas', cantidad: '1 kg', precio: 25 },
    { categoria: 'Tortillas y Pan', articulo: 'Pan integral / focaccia', cantidad: 'surtido', precio: 50 },
  ],

  2: [
    // Carne / Pescado
    { categoria: 'Carne / Pescado', articulo: 'Pollo entero', cantidad: '1.5 kg', precio: 180 },
    { categoria: 'Carne / Pescado', articulo: 'Pescado blanco', cantidad: '1 kg', precio: 280 },
    // Huevos / Lácteos
    { categoria: 'Huevos / Lácteos', articulo: 'Huevos', cantidad: '1.5 docenas', precio: 75 },
    { categoria: 'Huevos / Lácteos', articulo: 'Parmesano reggiano', cantidad: '100 g', precio: 60 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso oaxaca', cantidad: '200 g', precio: 35 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso panela', cantidad: '150 g', precio: 20 },
    { categoria: 'Huevos / Lácteos', articulo: 'Yogurt Flor de Alfalfa', cantidad: '1 kg', precio: 45 },
    { categoria: 'Huevos / Lácteos', articulo: 'Leche Lala Orgánica Blanca', cantidad: '2 L', precio: 55 },
    // Verduras
    { categoria: 'Verduras', articulo: 'Zanahorias', cantidad: '1.5 kg', precio: 30 },
    { categoria: 'Verduras', articulo: 'Calabacitas', cantidad: '1.5 kg', precio: 45 },
    { categoria: 'Verduras', articulo: 'Espinacas', cantidad: '3 manojos', precio: 90 },
    { categoria: 'Verduras', articulo: 'Jitomate', cantidad: '3 kg', precio: 75 },
    { categoria: 'Verduras', articulo: 'Cebolla', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Pepino', cantidad: '3 piezas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Aguacate', cantidad: '4 piezas', precio: 60 },
    { categoria: 'Verduras', articulo: 'Lechuga', cantidad: '2 piezas', precio: 40 },
    { categoria: 'Verduras', articulo: 'Chícharos frescos o congelados', cantidad: '500 g', precio: 25 },
    { categoria: 'Verduras', articulo: 'Brócoli', cantidad: '500 g', precio: 20 },
    { categoria: 'Verduras', articulo: 'Papas', cantidad: '2 kg', precio: 50 },
    { categoria: 'Verduras', articulo: 'Limones', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Hierbabuena fresca', cantidad: '1 manojo', precio: 10 },
    { categoria: 'Verduras', articulo: 'Hierbas (romero, perejil, cilantro, epazote)', cantidad: 'manojos', precio: 30 },
    // Fruta
    { categoria: 'Fruta', articulo: 'Plátanos', cantidad: '8 piezas', precio: 25 },
    { categoria: 'Fruta', articulo: 'Manzanas', cantidad: '12 piezas', precio: 55 },
    { categoria: 'Fruta', articulo: 'Tunas', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Sandía', cantidad: '1 pieza mediana', precio: 80 },
    { categoria: 'Fruta', articulo: 'Kiwi', cantidad: '6 piezas', precio: 50 },
    // Tortillas y pan
    { categoria: 'Tortillas y Pan', articulo: 'Tortillas de maíz frescas', cantidad: '1 kg', precio: 25 },
    { categoria: 'Tortillas y Pan', articulo: 'Pan integral / focaccia', cantidad: 'surtido', precio: 50 },
  ],

  3: [
    // Carne / Pescado
    { categoria: 'Carne / Pescado', articulo: 'Pollo (pechuga o entero)', cantidad: '1.5 kg', precio: 180 },
    { categoria: 'Carne / Pescado', articulo: 'Pescado blanco', cantidad: '1 kg', precio: 280 },
    // Huevos / Lácteos
    { categoria: 'Huevos / Lácteos', articulo: 'Huevos', cantidad: '2 docenas', precio: 100 },
    { categoria: 'Huevos / Lácteos', articulo: 'Parmesano reggiano', cantidad: '100 g', precio: 60 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso oaxaca', cantidad: '200 g', precio: 35 },
    { categoria: 'Huevos / Lácteos', articulo: 'Queso panela (para tarta salada)', cantidad: '300 g', precio: 40 },
    { categoria: 'Huevos / Lácteos', articulo: 'Yogurt Flor de Alfalfa', cantidad: '1 kg', precio: 45 },
    { categoria: 'Huevos / Lácteos', articulo: 'Leche Lala Orgánica Blanca', cantidad: '2 L', precio: 55 },
    // Verduras
    { categoria: 'Verduras', articulo: 'Zanahorias', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Calabacitas', cantidad: '1 kg', precio: 30 },
    { categoria: 'Verduras', articulo: 'Acelgas', cantidad: '3 manojos', precio: 60 },
    { categoria: 'Verduras', articulo: 'Brócoli', cantidad: '1.5 kg', precio: 60 },
    { categoria: 'Verduras', articulo: 'Espinacas', cantidad: '1 manojo', precio: 30 },
    { categoria: 'Verduras', articulo: 'Jitomate', cantidad: '3 kg', precio: 75 },
    { categoria: 'Verduras', articulo: 'Tomatillo', cantidad: '500 g', precio: 15 },
    { categoria: 'Verduras', articulo: 'Cebolla', cantidad: '1.5 kg', precio: 30 },
    { categoria: 'Verduras', articulo: 'Ajo', cantidad: '1 cabeza', precio: 10 },
    { categoria: 'Verduras', articulo: 'Pepino', cantidad: '3 piezas', precio: 30 },
    { categoria: 'Verduras', articulo: 'Aguacate', cantidad: '5 piezas', precio: 80 },
    { categoria: 'Verduras', articulo: 'Lechuga', cantidad: '2 piezas', precio: 40 },
    { categoria: 'Verduras', articulo: 'Chícharos frescos o congelados', cantidad: '500 g', precio: 30 },
    { categoria: 'Verduras', articulo: 'Papas', cantidad: '2 kg', precio: 50 },
    { categoria: 'Verduras', articulo: 'Limones', cantidad: '1 kg', precio: 20 },
    { categoria: 'Verduras', articulo: 'Hierbas (romero, perejil, cilantro, epazote, tomillo)', cantidad: 'manojos', precio: 40 },
    // Fruta
    { categoria: 'Fruta', articulo: 'Plátanos', cantidad: '8 piezas', precio: 25 },
    { categoria: 'Fruta', articulo: 'Manzanas', cantidad: '12 piezas', precio: 55 },
    { categoria: 'Fruta', articulo: 'Tunas', cantidad: '10 piezas', precio: 30 },
    { categoria: 'Fruta', articulo: 'Papaya', cantidad: '1 pieza mediana', precio: 60 },
    { categoria: 'Fruta', articulo: 'Uvas', cantidad: '500 g', precio: 60 },
    { categoria: 'Fruta', articulo: 'Kiwi', cantidad: '6 piezas', precio: 50 },
    // Tortillas y pan
    { categoria: 'Tortillas y Pan', articulo: 'Tortillas de maíz frescas', cantidad: '1.5 kg', precio: 40 },
    { categoria: 'Tortillas y Pan', articulo: 'Pan integral / focaccia', cantidad: 'surtido', precio: 50 },
  ],
}

export const PANTRY = [
  // Cereales / pasta
  { categoria: 'Cereales / Pasta', articulo: 'Arroz blanco', cantidad: '3 kg', precio: 75 },
  { categoria: 'Cereales / Pasta', articulo: 'Pasta italiana (varios formatos)', cantidad: '1.5 kg', precio: 150 },
  { categoria: 'Cereales / Pasta', articulo: 'Fideo seco (para sopa de fideo)', cantidad: '500 g', precio: 20 },
  { categoria: 'Cereales / Pasta', articulo: 'Farro', cantidad: '500 g', precio: 50 },
  { categoria: 'Cereales / Pasta', articulo: 'Avena', cantidad: '500 g', precio: 30 },
  { categoria: 'Cereales / Pasta', articulo: 'Harina 00', cantidad: '1 kg', precio: 25 },
  { categoria: 'Cereales / Pasta', articulo: 'Sémola de trigo', cantidad: '500 g', precio: 30 },
  { categoria: 'Cereales / Pasta', articulo: 'Tortillas de maíz (inicio)', cantidad: '1 kg', precio: 25 },
  { categoria: 'Cereales / Pasta', articulo: 'Tortillas de harina', cantidad: '2 paquetes', precio: 60 },
  { categoria: 'Cereales / Pasta', articulo: 'Totopos / tortilla chips', cantidad: '2 bolsas', precio: 60 },
  { categoria: 'Cereales / Pasta', articulo: 'Pan molido', cantidad: '250 g', precio: 20 },
  // Legumbres secas
  { categoria: 'Legumbres Secas', articulo: 'Frijoles negros', cantidad: '1 kg', precio: 40 },
  { categoria: 'Legumbres Secas', articulo: 'Frijoles pintos / bayos', cantidad: '1 kg', precio: 35 },
  { categoria: 'Legumbres Secas', articulo: 'Garbanzos secos', cantidad: '500 g', precio: 30 },
  { categoria: 'Legumbres Secas', articulo: 'Lentejas', cantidad: '1 kg', precio: 45 },
  { categoria: 'Legumbres Secas', articulo: 'Chícharos congelados', cantidad: '1 kg', precio: 40 },
  // Conservas
  { categoria: 'Conservas', articulo: 'Puré de jitomate', cantidad: '3 botellas', precio: 150 },
  { categoria: 'Conservas', articulo: 'Pulpa de jitomate', cantidad: '500 g', precio: 25 },
  { categoria: 'Conservas', articulo: 'Aceitunas verdes sin hueso', cantidad: '400 g', precio: 100 },
  { categoria: 'Conservas', articulo: 'Aceitunas negras', cantidad: '200 g', precio: 60 },
  { categoria: 'Conservas', articulo: 'Alcaparras en sal', cantidad: '1 frasco', precio: 70 },
  // Condimentos
  { categoria: 'Condimentos', articulo: 'Aceite de oliva extra virgen', cantidad: '1 L', precio: 250 },
  { categoria: 'Condimentos', articulo: 'Aceite de maíz o girasol', cantidad: '1 L', precio: 60 },
  { categoria: 'Condimentos', articulo: 'Vinagre', cantidad: '1 botella', precio: 25 },
  { categoria: 'Condimentos', articulo: 'Sal, pimienta y especias (comino, páprika, epazote, orégano)', cantidad: 'surtido', precio: 100 },
  { categoria: 'Condimentos', articulo: 'Levadura para tarta salada', cantidad: '1 sobre', precio: 30 },
  // Secos varios
  { categoria: 'Secos Varios', articulo: 'Piñones (para pesto)', cantidad: '50 g', precio: 80 },
  { categoria: 'Secos Varios', articulo: 'Nueces', cantidad: '200 g', precio: 150 },
  { categoria: 'Secos Varios', articulo: 'Pasas', cantidad: '200 g', precio: 50 },
  { categoria: 'Secos Varios', articulo: 'Miel', cantidad: '1 frasco', precio: 80 },
  { categoria: 'Secos Varios', articulo: 'Mermelada', cantidad: '1 frasco', precio: 60 },
  { categoria: 'Secos Varios', articulo: 'Granola', cantidad: '500 g', precio: 100 },
]
