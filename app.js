//開場動畫
let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象的動畫結束後的狀態
// parameter5
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut }) //動畫一跟動畫二同時
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);
// -----------------------------------------------------------------------------------

// 讓整個網站的ENTER KEY都無法使用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止FORM內部的BUTTON交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 選擇select內的OPTION之後，要改變相對應的顏色
let allSelects = document.querySelectorAll("select"); // 靜態NodeList
allSelects.forEach((select) => {
  //<select> HTML標籤裡面有一個onchange屬性，對應到DOM就是change事件
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); // e.target就是<select>
  });
});

// 改變credit之後，GPA也要更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

//改變分數時，顏色會變
function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

//轉換字母成數字的分數
//switch statement跟if -else statement一樣
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//計算總成績用的funcotion
function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; // GPA計算用分子
  let creditSum = 0; // GPA計算用分母

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      //valueAsNumber屬性是在credit欄位輸入數字後，到主控台找有一樣數字的屬性找到的，並且拿來使用
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2); //取到小數點後兩位
  }
  document.getElementById("result-gpa").innerText = result; //因為getElementById()會回傳html element，所以可以使用innerText
}

//設定按下addButton按鈕會觸發的事件
//會新增一個form，form裡面有5個元素
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  // 製作五個小元素
  let newInput1 = document.createElement("input"); //新增<input>標籤
  newInput1.setAttribute("type", "text"); //設定<input>裡面的屬性
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type"); //新增<input>裡面的class name

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");
  //記得設定更改credit欄位值，最後的成績會改變
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  // here is the select tag
  let newSelect = document.createElement("select"); //新增select標籤 (字母成績)
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  //按下select標籤後，最後的成績會變更，字母的顏色也會變更
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    //防止按下addbutton新增form之後，再刪除新增的form，整個網頁會被重新整理
    e.preventDefault();
    //設定新的form，被刪除要消失的動畫
    //另外一種動畫設定方式，animation 搭配keyframe
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    //設定監聽器，當這個動畫結束後，form remove，而且最下面的成績重新計算
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv); //把newDiv放進newForm中
  document.querySelector(".all-inputs").appendChild(newForm); //把newoform放進最大區塊中
  newForm.style.animation = "scaleUp 0.5s ease forwards"; //新增form的時候，有由小放大的動畫效果
});

//設定按下trash button會觸發的事件
//會刪除一個form
let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    // trash button的parentElement是div.grader，div.grader的parentElement是form
    //設定form新增一個class name 叫做remove，並到scss設定.remove的動畫，用transform設定
    //這邊只有做動畫，從視覺上消失，但其實form還是存在原本的位置，只是變透明而已
    e.target.parentElement.parentElement.classList.add("remove");
  });
});
allTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  //所以這邊要設定form監聽器，當form的remove動畫結束後，把form真的從畫面中刪除
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA(); //刪除一個form之後，也要重新計算總成績
  });
});

// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // 大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = []; //拿來存放下面的值

  for (let i = 0; i < graders.length; i++) {
    //children[0]會回傳 HTML element
    let class_name = graders[i].children[0].value; // class category//這樣就可以抓到使用者在category所輸入的文字
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;

    //防止使用者沒有輸入值，仍然進行運算
    //如果使用者有在category, number, credit, grade輸入內容，不是一個"""empty string
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      //就把上面取得的value放進一個object裡面
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object); //存放上面的值，並且到後面做排序
    }
  }

  // 取得object array後，我們可以把成績String換成數字
  for (let i = 0; i < objectArray.length; i++) {
    //class_grade_number是一個新的property
    //把原本字母成績轉成數字，放進新的prorperty class_grade_number
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray); //如果direction方式是降序排序，由大到小
  if (direction == "descending") {
    objectArray = objectArray.reverse(); //就把這個array順序倒過來放，因為merge sort是升序排序
  }

  // 根據object array的內容(針對字母轉成分數的property用merge sort排序過的內容)，來更新網頁
  //但<select>是一個下拉式選單，沒辦法像<input>標籤，用下面「HTML element 插入value」的方式更新，所以要再另外用JS
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = ""; //把全部的form都清空

  //把objectArray裡面的內容(對字母轉成分數的property用merge sort排序過的內容)，放進被清空的form裡面
  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
        <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value=${objectArray[i].class_name}
        /><!--
        --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
        /><!--
        --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
        /><!--
        --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
        ><!--
        --><button class="trash-button">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    </form>`;
  }

  // SELECT可直接用JS更改
  //querySelector是一個靜態的nodeList，他不像上面HTML collection會自動更新
  //所以要把<select>用JS更新
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // select事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select); //改變成績顏色
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target); //單獨變更select，就要換顏色
    });
  });

  // credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    //對於每個trash button都要做下面的功能(都是上面有做過的功能)
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

//寫merge sort
//將class_grade_number(字母轉成分數的property)進行排序
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
