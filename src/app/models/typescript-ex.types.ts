type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type PromType = UnwrapPromise<Promise<string>>;
type Result = UnwrapPromise<Promise<number>>;

// 1. Интерфейс пользователя (Basic)
// Создайте интерфейс User, который содержит:
// id (число)
// username (строка)
// email (строка)
// role (литеральный тип: 'admin', 'user' или 'guest')
// age (необязательное число)
interface User {
  id: number,
  username: string,
  email: string,
  role: 'admin' | 'user' | 'guest',
  age?: number,
}


// 2. Массив объектов (Intermediate)
// Напишите функцию filterActiveUsers, которая принимает массив объектов User (из первой задачи)
// и возвращает только тех, у кого роль не 'guest'. Убедитесь, что типы аргументов и возвращаемого значения указаны верно.
function filterActiveUsers(users: User[]): User[] {
   return users.filter(user => user.role !== 'guest');
}


// 3. Работа с Generics (Intermediate)
// Реализуйте универсальную функцию getFirstElement<T>, которая принимает массив типа T и возвращает первый элемент.
// Если массив пустой, функция должна возвращать undefined.
function getFirstElement<T>(itemsList: T[]): T | undefined {
  if (itemsList.length === 0) return undefined;
  return itemsList[0];
}

const firstElm = getFirstElement<number>([1, 2 , 3]);
console.log(firstElm);


// 4. Utility Types: Pick & Omit (Intermediate)
// Представьте, что при создании нового пользователя нам не нужны id и role (они генерируются базой).
// Создайте новый тип CreateUserDTO, используя User и встроенную утилиту Omit.
type CreateUserDTO = Omit<User, 'id' | 'role'>;
type UserDTO = Pick<User, 'age' | 'email' | 'username'>;


// 5. Readonly & Partial (Intermediate)
// Создайте функцию updateUser, которая принимает исходный объект User и объект с изменениями.
// Объект с изменениями должен позволять передать любое подмножество полей User (используйте Partial).
function updateUser(user: User, updatedUser: Partial<User>) {
  return {...user, ...updatedUser};
}


// 6. Union Types и Type Guarding (Advanced)
// Создайте два интерфейса: Square (сторона size) и Circle (радиус radius).
// Напишите функцию getArea, которая принимает Square | Circle и вычисляет площадь.
// Используйте проверку свойств для сужения типа.
interface Square {
  size: number;
}

interface Circle {
  radius: number;
}

function getArea(item: Square | Circle): number {
  let area = 0;

  if ('size' in item) {
    area = item.size * 2;
  } else {
    area = item.radius * 2 * 3.14;
  }

  return area;
}

const square = getArea({ radius: 10 });



// Get returned value with infer
type ReturnValue<T> = T extends (...args: T[]) => infer R ? R : never;

const fn = function getList(): string[] {
  return ['Lemon', 'Apple'];
}

type FuncReturnType = ReturnValue<typeof fn>;


// 7. Типизация асинхронных функций (Intermediate)
// Напишите функцию fetchData<T>(url: string): Promise<T>.
// Она должна выполнять fetch, парсить JSON и возвращать результат, типизированный как T.
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Fetch data failed');
  }

  const data = await response.json();

  return data as T;
}

const getData = fetchData<User>('http://localhost:8080');


// 8. Mapped Types (Advanced)
// Создайте тип Nullable<T>, который берет любой интерфейс и делает все его поля либо исходного типа, либо null.
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}


// 9. Перегрузка функций (Advanced)
// Напишите функцию processInput. Если на вход подается строка, она возвращает её длину.
// Если массив строк — возвращает сумму длин всех строк. Используйте перегрузку (function overloads).
function processInput(input: string): number;
function processInput(input: string[]): number;
function processInput(input: null): 0;

function processInput(input: string | string[] | null): number {
  if (input === null) {
    return 0;
  }

  if (Array.isArray(input)) {
    return input.reduce((acc, item) => acc + item.length, 0);
  }

  return input.length;
}

const countArrayInputs = processInput(['Apple', 'Orange', 'Watermelon']);
console.log(countArrayInputs);


// 10. Conditional Types (Expert)
// Реализуйте тип IsString<T>, который возвращает true (литерал), если T — это строка, и false в противном случае.
type IsString<T> = T extends string ? true : false;

type word = IsString<'Doksadoko'>;
type num = IsString<34324>;



// 12. Исчерпывающая проверка с never (Advanced)
// Добавьте в switch блок default. Внутри него присвойте переменную action новой переменной типа never
// (например, const _exhaustiveCheck: never = action;).
// Затем добавьте новый тип сущности 'SpecialEvent' в тип RoadEntities, но не добавляйте его обработку в switch.
// Убедитесь, что TypeScript выдает ошибку, защищая вас от необработанных случаев.
type Incident = {
  id: string,
  title: string,
  type: 'Incident'
}

type TrafficDisruption = {
  id: string,
  affectedArea: number[],
  type: 'TrafficDisruption'
}

// Объединение типов (Discriminated Union)
type RoadEntities = Incident | TrafficDisruption | SpecialEvent;

function checkEntity(roadEntity: RoadEntities) {
  switch (roadEntity.type) {
    case 'Incident':
      console.log('Incident');
      return roadEntity.type;

    case "TrafficDisruption":
      console.log('TrafficDisruption');
      return roadEntity.type;

    default:
      console.log('Default');
      const _exhaustiveCheck: never = roadEntity;
      return _exhaustiveCheck;
  }
}

type SpecialEvent = {
  id: string,
  title: string,
  dateTime: string,
  type: 'SpecialEvent'
}

const specEvent: SpecialEvent = {
  id: '12421',
  title: 'U2 Concert',
  dateTime: '12:45',
  type: "SpecialEvent"
};

const incident: Incident = {
  id: '99999',
  title: 'Ayalon North - Iranian Missile Damaged Road',
  type: 'Incident'
}

const entityTypeInc = checkEntity(incident);
console.log('entityTypeInc: ', entityTypeInc);

const entityTypeSpec = checkEntity(specEvent);
console.log('entityTypeSpec: ', entityTypeSpec);


// 13. Кортежи (Tuples) и Rest-параметры (Intermediate)
// Создайте тип-кортеж Coordinate, который представляет собой массив строго из трех элементов: [x: число, y: число, name: строка].
// Напишите функцию drawPath, которая принимает произвольное количество таких координат, используя rest-оператор (...points).
type Coordinate = [
  x: number,
  y: number,
  name: string
]

function drawPath(...args: Coordinate[]) {
  return args;
}

const drawRoad = drawPath([10, 20, 'Ayalon'], [20, 30, 'Zhabotinsky']);


// 14. Утилита Record<K, V> (Intermediate)
// У вас есть массив пользователей (из первой части). Напишите функцию normalizeUsers, которая принимает User[]
// и возвращает объект-словарь, где ключом является id пользователя (преобразованный в строку),
// а значением — сам объект User. Типизируйте возвращаемое значение функции с помощью встроенного типа Record.
function normalizeUsers(users: User[]): Record<string, User> {
  const usersDictionary: Record<string, User> = {};

  for (const user of users) {
    usersDictionary[user.id] = user;
  }

  return usersDictionary;
}

const usersList: User[] = [
  {
    id: 2132132,
    username: 'gog',
    email: 'a@a.com',
    age: 22,
    role: "user"
  },
  {
    id: 7777777,
    username: 'nemo',
    email: 'n@a.com',
    age: 34,
    role: "admin"
  }
];

const normalizedUserList = normalizeUsers(usersList);
