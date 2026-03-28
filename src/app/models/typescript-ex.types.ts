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

    case 'SpecialEvent':
      console.log('SpecialEvent');
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


// 15. Комбинация typeof и keyof (Intermediate)
// Дан объект с настройками:
// const config = { theme: 'dark', language: 'ru', apiTimeout: 5000 };
// С помощью typeof создайте тип ConfigType на основе этого объекта.
// Затем напишите функцию getSetting, которая принимает два аргумента: сам объект настроек и ключ.
// Используйте keyof ConfigType, чтобы TypeScript разрешал передавать только валидные ключи ('theme', 'language' или 'apiTimeout').
const config = { theme: 'dark', language: 'ru', apiTimeout: 5000 };

type ConfigType = typeof config;

// Type Inference (Вывод типов)
function getSetting<T extends keyof ConfigType>(config: ConfigType, key: T): ConfigType[T] {
  return config[key];
}

const settingsVal = getSetting(config, 'theme');



// Задача: "Employee Hierarchy Transformer"
// Представь, что бэкенд возвращает список сотрудников в «плоском» виде.
// Тебе нужно написать универсальную функцию-трансформер, которая превратит этот массив в иерархическое дерево
// (например, для отрисовки оргсхемы).

// Условия (Requirements)
// Типизация (Generics):
// - Функция должна быть универсальной.
// - Она не должна быть жестко привязана к типу Employee.
// - Она должна работать с любым объектом, у которого есть уникальный идентификатор (id) и ссылка на родителя (parentId).
// - Strict Typing: Используй Generics, чтобы результирующее дерево сохранило все поля исходного объекта.
// Результирующий тип должен автоматически добавлять поле children, которое является массивом объектов того же типа.
// Используй keyof, чтобы указать, какие именно поля в объекте отвечают за id и parentId
// (так как на бэкенде они могут называться по-разному, например uuid и managerId).

// Логика:
// - Функция должна принимать массив объектов.
// - Функция должна возвращать массив «корневых» узлов (у которых parentId равен null, undefined или пустой строке).
// - Сложность алгоритма должна быть $O(n)$, желательно избежать вложенных циклов $O(n^2)$.

type TreeNode<T> = T & {
  children: TreeNode<T>[]
};

function arrayToTree<T, K extends keyof T>(
  items: T[],
  idKey: K,
  parentIdKey: K
): TreeNode<T>[] {
  const rootNodes: TreeNode<T>[] = [];
  const itemsMap: Map<T[K], TreeNode<T>> = new Map();

  for (const item of items) {
    itemsMap.set(item[idKey], { ...item, children: [] });
  }

  for (const item of items) {
    const parentId = item[parentIdKey];
    const node = itemsMap.get(item[idKey])!;

    if (parentId === null || parentId === undefined || parentId === '') {
      rootNodes.push(node);
    } else {
      const parentNode = itemsMap.get(parentId);

      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  }

  return rootNodes;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  managerId: number | null;
}

const employees: Employee[] = [
  { id: 1, name: "Alice", role: "CEO", managerId: null },
  { id: 2, name: "Bob", role: "CTO", managerId: 1 },
  { id: 3, name: "Charlie", role: "Senior Dev", managerId: 2 },
  { id: 4, name: "David", role: "Junior Dev", managerId: 2 },
];

const usersTree = arrayToTree(employees, 'id', 'managerId');
console.log(usersTree);


// 24. Операторы высшего порядка и вывод типов (Intermediate)
// Сценарий: У нас есть поток ID пользователей (например, клики по списку).
// Для каждого ID мы должны сделать сетевой запрос.
// Задача: Замени все any на правильные типы. Убедись, что итоговый userProfile$ имеет тип Observable<UserProfile>,
// а не Observable<Observable<UserProfile>>.
import { Observable, of, debounceTime, distinctUntilChanged } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface UserProfileN {
  id: number;
  name: string;
}

// Заглушка сетевого запроса
function fetchUser(id: number): Observable<UserProfileN | null> {
  return of<UserProfileN | null>({ id, name: `User ${id}` });
}

// Исходный поток: клики по элементам, из которых мы достаем ID (строку)
const clickId$: Observable<string> = of('1', '2', '3'); // Типизируй как поток строк

// Преобразуй строки в числа и сделай запрос
const userProfile$: Observable<UserProfileN | null> = clickId$.pipe(
  map((id: string) => parseInt(id, 10)),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((id: number) => fetchUser(id).pipe(
    catchError(() => of(null))
  )),
);



// 25. Обработка ошибок и изменение типа потока (Senior)
// Сценарий: При ошибке запроса профиля мы не хотим "убивать" поток. Мы хотим вернуть гостевой профиль.
// Задача: Типизируй catchError так, чтобы итоговый поток safeProfile$ честно говорил TypeScript,
// что он может вернуть либо UserProfile, либо GuestProfile.
import { catchError } from 'rxjs/operators';

interface UserProfile { type: 'user'; name: string }
interface GuestProfile { type: 'guest'; isAnonymous: true }
type ResponseProfile = UserProfile | GuestProfile;

function getUserStrict(id: number): Observable<UserProfile> {
  // Представим, что здесь может вылететь ошибка
  return of({ type: 'user', name: 'Michael' } as UserProfile);
}

const fallbackGuest: GuestProfile = { type: 'guest', isAnonymous: true };

// Типизируй safeProfile$
const safeProfile$: Observable<ResponseProfile> = getUserStrict(42).pipe(
  catchError((error: unknown) => {
    // Как правильно вернуть fallbackGuest, чтобы TS объединил типы?
    return of<ResponseProfile>(fallbackGuest);
  })
);


// 26. Собственный кастомный оператор (Expert)
// Сценарий: Очень частая проблема — в потоке идут значения, включая null или undefined.
// Нам нужен оператор filterNil, который не только отфильтрует их в рантайме, но и сузит тип для TypeScript.
// Задача: Напиши функцию filterNil<T>(). Она должна возвращать OperatorFunction.
// Используй TypeScript Type Predicate (is), чтобы после этого оператора тип Observable<string | null>
// превращался строго в Observable<string>.
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

// Реализуй эту функцию
function filterNil<T>(): OperatorFunction<T, NonNullable<T>> {
  return (source$) => source$.pipe(
    filter((value: T): value is NonNullable<T> => value !== null && value !== undefined),
  );
}

// Проверка:
const mixed$: Observable<string | null | undefined> = of("Frontend", null, "Interview", undefined);

// Тип strict$ должен стать строго Observable<string>
const strict$ = mixed$.pipe(filterNil());



// 27. Computed и Read-only Signals (Intermediate)
// Сценарий: У нас есть корзина товаров. Мы хотим вычислять общую стоимость.
// Задача: Типизируй сигналы. Покажи, как запретить разработчикам случайно менять значение totalPrice
// напрямую (он должен быть только для чтения).
import { signal, computed, WritableSignal, Signal } from '@angular/core';

interface CartItem { id: number; price: number; amount: number; }

// Типизируй корзину
const cart = signal<CartItem[]>([
  { id: 1, price: 100, amount: 2 },
  { id: 2, price: 50, amount: 1 }
]);

// Напиши вычисляемый сигнал для суммы. Какой у него будет тип?
const totalPrice = computed(() => {
  return cart().reduce((acc, item) => acc + (item.price * item.amount), 0);
});

// Проверка: totalPrice.set(100) // Должно выдавать ошибку TS!



// 28. Signal Inputs и Трансформация типов (Senior) - (Angular 17.1+ фича)
// Сценарий: Твой компонент принимает id из URL (в Angular Router они всегда приходят как строки,
// если включен bindToComponentInputs). Но внутри компонента тебе нужен строго number.
// Задача: Используй новый API input() с опцией transform. Напиши функцию трансформации,
// которая возьмет string | number, вернет number, и заставит InputSignal иметь тип number.

import { Component, input, InputSignal } from '@angular/core';

// Функция трансформации
function toNumber(value: string | number): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

@Component({
  selector: 'app-user-detail',
  template: `ID: {{ userId() }}`
})
export class UserDetailComponent {
  // Настрой signal input так, чтобы извне можно было передать строку,
  // но сам userId имел строгий тип InputSignal<number>
  // Явно говорим: снаружи ждем string или number, а внутри будет number
  userId = input.required<string | number, number>({
    transform: toNumber
  });

  constructor() {
    // const idType = this.userId(); // Должно быть number
  }
}
