import { QMainWindow, QWidget, FlexLayout, QPushButton, QLabel, } from '@nodegui/nodegui';
import { WSAEHOSTDOWN } from 'constants';
import { evaluate } from './calcFunctions.js';

// buttons
const zero = new QPushButton();
const one = new QPushButton();
const two = new QPushButton();
const three = new QPushButton();
const four = new QPushButton();
const five = new QPushButton();
const six = new QPushButton();
const seven = new QPushButton();
const eight = new QPushButton();
const nine = new QPushButton();

const plus = new QPushButton();
const subtract = new QPushButton();
const times = new QPushButton();
const divide = new QPushButton();
const exponent = new QPushButton();
const sign = new QPushButton();
const decimal = new QPushButton();

const equals = new QPushButton();
const clear = new QPushButton();
const backspace = new QPushButton();

const pi = new QPushButton();
const sin = new QPushButton();
const cos = new QPushButton();
const tan = new QPushButton();
const csc = new QPushButton();
const sec = new QPushButton();
const cot = new QPushButton();
const arcsin = new QPushButton();
const arccos = new QPushButton();
const arctan = new QPushButton();
const arccsc = new QPushButton();
const arcsec = new QPushButton();
const arccot = new QPushButton();
const degToRad = new QPushButton();

const ln = new QPushButton();
const log = new QPushButton();

const openParentheses = new QPushButton();
const closeParentheses = new QPushButton();
const openSquareBrackets = new QPushButton();
const closeSquareBrackets = new QPushButton();
const openCurlyBrace = new QPushButton();
const closeCurlyBrace = new QPushButton();

// add labels
zero.setText('0');
one.setText('1');
two.setText('2');
three.setText('3');
four.setText('4');
five.setText('5');
six.setText('6');
seven.setText('7');
eight.setText('8');
nine.setText('9');

plus.setText('+');
subtract.setText('-');
times.setText('*');
divide.setText('/');
exponent.setText('^');
sign.setText('+/-');
decimal.setText('.');

equals.setText('=');
clear.setText('C');
backspace.setText('<-');

pi.setText('pi');
sin.setText('sin');
cos.setText('cos');
tan.setText('tan');
csc.setText('csc');
sec.setText('sec');
cot.setText('cot');
arcsin.setText('arcsin');
arccos.setText('arccos');
arctan.setText('arctan');
arccsc.setText('arccsc');
arcsec.setText('arcsec');
arccot.setText('arccot');
degToRad.setText('Radians');

ln.setText('ln');
log.setText('log10');

openParentheses.setText('(');
closeParentheses.setText(')');
openSquareBrackets.setText('[');
closeSquareBrackets.setText(']');
openCurlyBrace.setText('{');
closeCurlyBrace.setText('}');

// add functionality to the buttons
zero.addEventListener('clicked', () => updateDisplay('0'));
one.addEventListener('clicked', () => updateDisplay('1'));
two.addEventListener('clicked', () => updateDisplay('2'));
three.addEventListener('clicked', () => updateDisplay('3'));
four.addEventListener('clicked', () => updateDisplay('4'));
five.addEventListener('clicked', () => updateDisplay('5'));
six.addEventListener('clicked', () => updateDisplay('6'));
seven.addEventListener('clicked', () => updateDisplay('7'));
eight.addEventListener('clicked', () => updateDisplay('8'));
nine.addEventListener('clicked', () => updateDisplay('9'));

plus.addEventListener('clicked', () => updateDisplay('+'));
subtract.addEventListener('clicked', () => updateDisplay('-'));
times.addEventListener('clicked', () => updateDisplay('*'));
divide.addEventListener('clicked', () => updateDisplay('/'));
exponent.addEventListener('clicked', () => updateDisplay('^'));
sign.addEventListener('clicked', () => updateDisplay('+/-'));
decimal.addEventListener('clicked', () => updateDisplay('.'));

equals.addEventListener('clicked', () => updateDisplay('='));
clear.addEventListener('clicked', () => updateDisplay('C'));
backspace.addEventListener('clicked', () => updateDisplay('<-'));

pi.addEventListener('clicked', () => updateDisplay('pi'));
sin.addEventListener('clicked', () => updateDisplay('sin'));
cos.addEventListener('clicked', () => updateDisplay('cos'));
tan.addEventListener('clicked', () => updateDisplay('tan'));
csc.addEventListener('clicked', () => updateDisplay('csc'));
sec.addEventListener('clicked', () => updateDisplay('sec'));
cot.addEventListener('clicked', () => updateDisplay('cot'));
arcsin.addEventListener('clicked', () => updateDisplay('arcsin'));
arccos.addEventListener('clicked', () => updateDisplay('arccos'));
arctan.addEventListener('clicked', () => updateDisplay('arctan'));
arccsc.addEventListener('clicked', () => updateDisplay('arccsc'));
arcsec.addEventListener('clicked', () => updateDisplay('arcsec'));
arccot.addEventListener('clicked', () => updateDisplay('arccot'));
degToRad.addEventListener('clicked', () => updateDisplay('degToRad'));

ln.addEventListener('clicked', () => updateDisplay('ln'));
log.addEventListener('clicked', () => updateDisplay('log10'));

openParentheses.addEventListener('clicked', () => updateDisplay('('));
closeParentheses.addEventListener('clicked', () => updateDisplay(')'));
openSquareBrackets.addEventListener('clicked', () => updateDisplay('['));
closeSquareBrackets.addEventListener('clicked', () => updateDisplay(']'));
openCurlyBrace.addEventListener('clicked', () => updateDisplay('{'));
closeCurlyBrace.addEventListener('clicked', () => updateDisplay('}'));

// add to window
const win = new QMainWindow();
win.setWindowTitle("Scientific Calculator");
const screen = new QLabel();
screen.setObjectName("screen");
screen.setText("");

// create widget for screen and widget for buttons. Then place the buttons inside of the button widget

const centralWidget = new QWidget();
const rootLayout = new FlexLayout();
centralWidget.setObjectName("myroot");
centralWidget.setLayout(rootLayout);

win.setCentralWidget(centralWidget);

const screenDisplay = new QWidget();
const screenDisplayLayout = new FlexLayout();
screenDisplay.setObjectName("screenDisplay");
screenDisplay.setLayout(screenDisplayLayout);

screenDisplayLayout.addWidget(screen);

centralWidget.layout.addWidget(screenDisplay);

const buttonDisplay = new QWidget();
const buttonDisplayLayout = new FlexLayout();
buttonDisplay.setObjectName("buttonDisplay");
buttonDisplay.setLayout(buttonDisplayLayout);

// buttons are added by row
const row1 = new QWidget();
const row1Layout = new FlexLayout();
row1.setObjectName("row1");
row1.setLayout(row1Layout);

row1Layout.addWidget(sin);
row1Layout.addWidget(arcsin);
row1Layout.addWidget(pi);
row1Layout.addWidget(log);
row1Layout.addWidget(clear);
row1Layout.addWidget(backspace);

const row2 = new QWidget();
const row2Layout = new FlexLayout();
row2.setObjectName("row2");
row2.setLayout(row2Layout);

row2Layout.addWidget(cos);
row2Layout.addWidget(arccos);
row2Layout.addWidget(degToRad);
row2Layout.addWidget(ln);
row2Layout.addWidget(exponent);
row2Layout.addWidget(divide);

const row3 = new QWidget();
const row3Layout = new FlexLayout();
row3.setObjectName("row3");
row3.setLayout(row3Layout);

row3Layout.addWidget(tan);
row3Layout.addWidget(arctan);
row3Layout.addWidget(seven);
row3Layout.addWidget(eight);
row3Layout.addWidget(nine);
row3Layout.addWidget(times);

const row4 = new QWidget();
const row4Layout = new FlexLayout();
row4.setObjectName("row4");
row4.setLayout(row4Layout);

row4Layout.addWidget(csc);
row4Layout.addWidget(arccsc);
row4Layout.addWidget(four);
row4Layout.addWidget(five);
row4Layout.addWidget(six);
row4Layout.addWidget(subtract);

const row5 = new QWidget();
const row5Layout = new FlexLayout();
row5.setObjectName("row5");
row5.setLayout(row5Layout);

row5Layout.addWidget(sec);
row5Layout.addWidget(arcsec);
row5Layout.addWidget(one);
row5Layout.addWidget(two);
row5Layout.addWidget(three);
row5Layout.addWidget(plus);

const row6 = new QWidget();
const row6Layout = new FlexLayout();
row6.setObjectName("row6");
row6.setLayout(row6Layout);

row6Layout.addWidget(cot);
row6Layout.addWidget(arccot);
row6Layout.addWidget(decimal);
row6Layout.addWidget(zero);
row6Layout.addWidget(sign);
row6Layout.addWidget(equals);

const row7 = new QWidget();
const row7Layout = new FlexLayout();
row7.setObjectName("row7");
row7.setLayout(row7Layout);

row7Layout.addWidget(openParentheses);
row7Layout.addWidget(closeParentheses);

const row8 = new QWidget();
const row8Layout = new FlexLayout();
row8.setObjectName("row8");
row8.setLayout(row8Layout);

row8Layout.addWidget(openSquareBrackets);
row8Layout.addWidget(closeSquareBrackets);

const row9 = new QWidget();
const row9Layout = new FlexLayout();
row9.setObjectName("row9");
row9.setLayout(row9Layout);

row9Layout.addWidget(openCurlyBrace);
row9Layout.addWidget(closeCurlyBrace);

buttonDisplayLayout.addWidget(row1);
buttonDisplayLayout.addWidget(row2);
buttonDisplayLayout.addWidget(row3);
buttonDisplayLayout.addWidget(row4);
buttonDisplayLayout.addWidget(row5);
buttonDisplayLayout.addWidget(row6);
buttonDisplayLayout.addWidget(row7);
buttonDisplayLayout.addWidget(row8);
buttonDisplayLayout.addWidget(row9);

rootLayout.addWidget(buttonDisplay);

win.setStyleSheet(
  `
      #myroot {
        background-color: #142970;
        height: '100%';
        align-items: 'center';
        justify-content: 'center';
        flex: 1;
      }

      #screenDisplay {
          flex: .5;
          background-color: white;
          width: '100%';
      }    

      #buttonDisplay {
        flex: 1;
        flex-direction: column;
      }

      #screen {
        font-size: 14pt;
      }

      #row1, #row2, #row3, #row4, #row5, #row6, #row7, #row8, #row9 {
        flex: 1;
        flex-direction: row;
      }
    `
);

let display = [];
let userDisplay = '';
let degOrRad = 'rad';

// function that will update the equation on the display
export function updateDisplay(input) {
  if (input == '<-') {
    if (display.length == 0) {
      return;
    }

    let temp = display[display.length - 1];

    if (temp.length > 1) {
      userDisplay = userDisplay.slice(0, userDisplay.length - temp.length);
      display.pop();
      screen.setText(userDisplay);
    }

    else {
      userDisplay = userDisplay.slice(0, -1);
      display.pop();
      screen.setText(userDisplay);
    }
  }

  else if (input == 'C') {
    display = [];
    userDisplay = '';
    screen.setText(userDisplay);
  }

  // negates the last number entered.
  else if (input == '+/-') {
    // find where number ends in the array
    let i = display.length - 1;
    while ((display[i] >= '0' && display[i] <= '9') && i >= 0) {
      i--;
    }

    display.splice(i + 1, 0, 'n');

    // find where number ends in the string
    i = userDisplay.length - 1;
    while ((userDisplay[i] >= '0' && userDisplay[i] <= '9') && i >= 0) {
      i--;
    }

    let temp = userDisplay.substring(i + 1);
    userDisplay = userDisplay.slice(0, i + 1);
    userDisplay += '-' + temp;
    screen.setText(userDisplay);
  }

  else if (input == 'pi') {
    userDisplay += 'pi';
    display.push(Math.PI);
    screen.setText(userDisplay);
  }

  else if (input == 'degToRad') {
    if (degOrRad == 'deg') {
      degOrRad = 'rad';
      degToRad.setText("Radians");
    }

    else {
      degOrRad = 'deg';
      degToRad.setText("Degrees");
    }
  }

  else if (input == '=') {
    submit(display, degOrRad);
    display = [];
    display.push('' + userDisplay);
    console.log(display);
  }

  // if character is number or basic operator
  else {
    display.push(input);
    userDisplay += input;
    screen.setText(userDisplay);
  }
}

function submit(equation, unit) {
  userDisplay = evaluate(equation, unit);

  if (Number.isNaN(userDisplay)) {
    screen.setText('Error: Invalid Input')
  }

  else {
    screen.setText(userDisplay);
  }
}


export { win };