export const topics = [
  { id: 'web', name: 'Web development', icon: '</>', color: 'mint', description: 'The building blocks behind the browser.' },
  { id: 'science', name: 'Science & nature', icon: '✳', color: 'peach', description: 'Big discoveries. Small wonders.' },
  { id: 'world', name: 'Around the world', icon: '◎', color: 'lavender', description: 'Places, people, and a planet to explore.' },
];
const q = (id, topic, prompt, options, answer, explanation) => ({id, topic, prompt, options, answer, explanation});
export const questions = [
  q('w1','web','What does HTML stand for?',['HyperText Markup Language','High Transfer Machine Language','Hyperlink Text Management Language','Home Tool Markup Language'],0,'HTML stands for HyperText Markup Language. It describes the structure of a web page.'),
  q('w2','web','Which CSS property controls the space inside an element’s border?',['margin','gap','padding','outline'],2,'Padding adds space between content and its border. Margin adds space outside the border.'),
  q('w3','web','Which React Hook adds local state to a component?',['useEffect','useState','useRef','useMemo'],1,'useState returns the current state and a function for updating it.'),
  q('w4','web','Which array method creates a new array by transforming each item?',['push()','find()','map()','some()'],2,'map() applies a callback to every item and returns a new array of the results.'),
  q('w5','web','What does an HTTP 404 response mean?',['Request succeeded','Authentication required','Server unavailable','Resource not found'],3,'404 means the server could not find the requested resource.'),
  q('w6','web','Which HTML element is intended for a primary navigation section?',['<nav>','<aside>','<main>','<footer>'],0,'The nav element identifies a section containing navigation links.'),
  q('w7','web','What is the result of typeof true in JavaScript?',['"string"','"boolean"','"number"','"object"'],1,'true and false are Boolean values, so typeof returns the string "boolean".'),
  q('w8','web','Which CSS declaration makes an element a flex container?',['position: flex','flex: display','display: flex','layout: flex'],2,'display: flex establishes a flex formatting context for the element’s children.'),
  q('s1','science','Which planet is the largest in our solar system?',['Earth','Neptune','Saturn','Jupiter'],3,'Jupiter is the largest planet in our solar system by both mass and volume.'),
  q('s2','science','What is the chemical symbol for gold?',['Ag','Au','Fe','Gd'],1,'Gold’s symbol Au comes from its Latin name, aurum.'),
  q('s3','science','What process allows plants to convert sunlight into chemical energy?',['Respiration','Evaporation','Photosynthesis','Fermentation'],2,'Photosynthesis uses light energy to produce sugars from carbon dioxide and water.'),
  q('s4','science','How many bones are typically in an adult human skeleton?',['206','186','226','256'],0,'The standard adult human skeleton has 206 bones, though individual variation exists.'),
  q('s5','science','Which gas makes up most of Earth’s atmosphere?',['Oxygen','Carbon dioxide','Hydrogen','Nitrogen'],3,'Nitrogen accounts for about 78% of Earth’s atmosphere by volume.'),
  q('s6','science','What is the SI unit of electrical resistance?',['Volt','Watt','Ohm','Ampere'],2,'Electrical resistance is measured in ohms, represented by the symbol Ω.'),
  q('s7','science','Which part of a cell contains most of its genetic material in humans?',['Nucleus','Cell membrane','Ribosome','Cytoplasm'],0,'Most human DNA is in the nucleus; a small amount is in mitochondria.'),
  q('s8','science','Sound travels fastest through which of these materials?',['Air','Water','A vacuum','Steel'],3,'Sound typically travels faster in solids like steel than in liquids or gases. It cannot travel in a vacuum.'),
  q('g1','world','Which city is the capital of Nepal?',['Pokhara','Kathmandu','Lalitpur','Biratnagar'],1,'Kathmandu is Nepal’s capital and lies in the Kathmandu Valley.'),
  q('g2','world','Which ocean is the largest?',['Atlantic','Indian','Pacific','Arctic'],2,'The Pacific is the largest and deepest of Earth’s oceans.'),
  q('g3','world','On which continent is the Sahara Desert?',['Asia','Australia','South America','Africa'],3,'The Sahara stretches across much of North Africa.'),
  q('g4','world','Which country is home to Machu Picchu?',['Peru','Mexico','Chile','Bolivia'],0,'Machu Picchu is an Inca site in the Andes Mountains of Peru.'),
  q('g5','world','What is the currency of Japan?',['Won','Yuan','Yen','Baht'],2,'Japan’s currency is the yen, commonly represented by ¥.'),
  q('g6','world','Which country has the city of Barcelona?',['Italy','Spain','Portugal','France'],1,'Barcelona is in northeastern Spain, on the Mediterranean coast.'),
  q('g7','world','Which mountain range separates much of Europe from Asia?',['Andes','Alps','Himalayas','Urals'],3,'The Ural Mountains form part of the conventional boundary between Europe and Asia.'),
  q('g8','world','Which country is known for the ancient city of Petra?',['Egypt','Greece','Jordan','Türkiye'],2,'Petra is an ancient city in Jordan famous for architecture carved into sandstone.'),
];
export function makeQuiz(topic, count, random = Math.random) {
  const pool = questions.filter(question => question.topic === topic);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, count);
}
