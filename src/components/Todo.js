import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';
import useFbStorage from '../hooks/fbStorage';
/* ライブラリ */
//import {getKey} from "../lib/util";

function Todo() {
  // const [items, putItems, clearItems] = useStorage();
  //     /* テストコード 開始 */
  //   { key: getKey(), text: '日本語の宿題', done: false },
  //   { key: getKey(), text: 'reactを勉強する', done: false },
  //   { key: getKey(), text: '明日の準備をする', done: false },
  //   /* テストコード 終了 */
  // ]);
  
  const [items, addItem, updateItem, clearItems] = useFbStorage();
  
  const [filter, setFilter] = React.useState('ALL');
  
  
  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleFilterChange = value => setFilter(value);
  
  const handleCheck = checked => {
    // const newItems = items.map(item => {
    //   if (item.key === checked.key) {
    //     item.done = !item.done;
    //   }
    //   return item;
    // });
    // putItems(newItems);
    updateItem(checked);
  };
  
  const handleInput = text => {
    //putItems([...items, {key: getKey(), text, done: false}]);
    addItem({text, done: false})
  };
  
  
  
  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input onInput={handleInput}/>
       <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map(item => (
        <TodoItem
          key={item.key}
          item={item}
          onCheck={handleCheck}
        />
        ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;