import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestCompornet from './TestCompornet';

// JSON型推論
import Data from './data.json'

type USERS = typeof Data


// constとlet
const name = 'hello'      // constは再代入できない
name = 'hello2'           // NG
let nameChange = 'hello'  // letは再代入できる
nameChange = 'hello2'     // OK

// Primitive Types(プリミティブ型)
// 型推論とアノテーション
let username1 = 'Hello'
let username2: string = 'Hello'
let dummyNum1 = 2
let dummyNum2: Number = 2
let bool1 = true
let bool2: boolean = true

// Array(配列)
let array1 = [true, false, true]
let array2 = [0, 1, 'hello']

// Interface(インターフェース)
interface NAME {
  first: string,
  last: string | null // | null を付けることで値セット時にnullを許容する
}

// Interfaceの補足「宣言のマージ」
// Typeとよく比較されるが、一番の違いはここ
// 同名のinterfaceを宣言すると型が追加される
// 同じ名前を共有する複数の宣言を自動的に結合する
interface NAME {
  test?: string // ?をつけると、testを宣言しなくてもエラーしなくなる
}
let nameObj1: NAME = {first: 'Yamada', last: 'Taro', test: 'aaa'}
let nameObj2: NAME = {first: 'Yamada', last: null}

// function(関数)
const func1 = (x: number, y: number) => {
  return x + y
}
const func2 = (x: number, y: number): number => {
  return x + y
}

// Type Alias(型エイリアス)
type PROFILE = {
  age: number
  city: string
}

type LOGIN = {
  username: string
  password: string
}

// Intersection Types(交差型)
type USER = PROFILE & LOGIN

const userA: USER = {
  age: 30,
  city: 'Tokyo',
  username: 'xxx',
  password: 'yyy',
}

// Union Types(複合型)
let value: boolean | number
value = true
value = 100
// 配列でも使える
let arrayUni: (number | string)[]
arrayUni = [0, 1, 2, 'Hello']


// Literal Types
let gafa: 'Google' | 'Amazon' | 'Facebook' | 'Apple'
gafa = 'Amazon'     // OK
gafa = 'Microsoft'  // NG

let memory: 256 | 512
memory = 256  // OK
memory = 12   // NG


// typeof
// 宣言済み変数の型を取得
// JSONの型定義とかで効果を発揮する
let msg1: string = 'Hi'
let msg2: typeof msg1 // msg1の型を継承している形
msg2 = 'Hello'

let animal = { cat: 'small cat' }
let newAnimal: typeof animal = { cat: 'big cat' }

// keyof
type KEYS = {
  primary: string,
  secondary: string
}
// KEYSの型を継承する
let key: keyof KEYS 
key = 'primary' // OK
key = 'noooo'   // NG


// typeof + keyof
const SPORTS = {
  soccer: 'Soccer',
  baseball: 'Baseball',
}

// SPORTSのデータ型、属性の名前を取り出してUnion Typeにしている
let keySports: keyof typeof SPORTS
keySports = 'soccer'

// enum(列挙型)
enum OS {
  Windows,  // 0
  Mac,      // 1
  Linux,    // 2
}
interface PC {
  id: number,
  OSType: OS,
}
const PC1: PC = {
  id: 1,
  OSType: OS.Windows,
}
const PC2: PC = {
  id: 2,
  OSType: OS.Mac,
}

// 型の互換性
// より抽象度の高いstring型に対して具体的なtestという文字列は挿入できるが、逆はできない、ということ
let comp1 = 'test'
let comp2: string = comp1 // OK

let comp3: string = 'test'
let comp4: 'test' = comp3 // NG

// これはそもそも型が違うのでどちらもダメ
let funcComp1 = (x: number) => {}
let funcComp2 = (x: string) => {}
funcComp1 = funcComp2 // NG
funcComp2 = funcComp1 // NG

// Generics(ジェネリクス)
// テンプレートだけ用意しておいて、使うときに具体的な型を指定することができる
interface GEN<T> {
  item:T
}
const gen0: GEN<string> = { item: 'hello' }   // OK
const gen1: GEN = { item: 'hello' }           // NG
const gen2: GEN<number> = { item: 'hello' }   // NG
const gen3: GEN<number> = { item: 100 }       // OK

// デフォルトの型を指定することもできる
interface GEN1<T=string> {
  item: T
}
const gen4: GEN1 = { item: 'hello' }

// extendsを使ったGenerics
interface GEN2<T extends string | number > {
  item: T
}
const gen5: GEN2<string> = { item: 'hello' }  // OK
const gen6: GEN2<number> = { item: 100 }      // OK
const gen7: GEN2<boolean> = {item: true }     // NG

// functionを使ったGenerics
function funcGen<T>(props: T) {
  return { item:props }
}
const gen8 = funcGen('test')
const gen9 = funcGen<string>('test')
const gen10 = funcGen<string | null>('test')
const gen11 = funcGen<string | null>(null)

// functionとextendsを使ったGenerics
function funcGen1<T extends string | null>(props: T) {
  return { value: props }
}
const gen12 = funcGen1('hello') // OK
const gen13 = funcGen1(100)     // NG

// props?
interface Props {
  price: number
}
function funcGen2<T extends Props>(props: T) {
  return { value: props.price }
}
const gen14 = funcGen2({ price: 10 })

// functionをアロー関数で書いたバージョン
const funcGen3 = <T extends Props>(props: T) => {
  return { value: props.price }
}




// React Hooksの登場でクラスコンポーネントからファンクショナルコンポーネントへの開発へシフトすることになる

// React Hooks Props型




// React Hooks useState



// Event handler:データ型



// Tuple(タプル型)



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header"></header>
//     </div>
//   );
// }
// デフォルトの状態からアロー関数に書き換える
const App: React.FC = () => { // FCがリアクトファンクショナルコンポーネントの略
  return (
    <div className="App">
      <header className="App-header">
        <TestCompornet text={'hello from app'}/>
      </header>
    </div>
  );
}

export default App;

