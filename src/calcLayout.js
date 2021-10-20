import { QMainWindow, QWidget, FlexLayout, QPushButton, QLabel, QTextEdit, QGridLayout, } from '@nodegui/nodegui';

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
degToRad.setText('Degrees');

ln.setText('ln');
log.setText('log10');

openParentheses.setText('(');
closeParentheses.setText(')');
openSquareBrackets.setText('[');
closeSquareBrackets.setText(']');
openCurlyBrace.setText('{');
closeCurlyBrace.setText('}');

// add functionality to the buttons
zero.addEventListener('clicked', () => console.log('0'));
one.addEventListener('clicked', () => console.log('1'));
two.addEventListener('clicked', () => console.log('2'));
three.addEventListener('clicked', () => console.log('3'));
four.addEventListener('clicked', () => console.log('4'));
five.addEventListener('clicked', () => console.log('5'));
six.addEventListener('clicked', () => console.log('6'));
seven.addEventListener('clicked', () => console.log('7'));
eight.addEventListener('clicked', () => console.log('8'));
nine.addEventListener('clicked', () => console.log('9'));

plus.addEventListener('clicked', () => console.log('+'));
subtract.addEventListener('clicked', () => console.log('-'));
times.addEventListener('clicked', () => console.log('*'));
divide.addEventListener('clicked', () => console.log('/'));
exponent.addEventListener('clicked', () => console.log('^'));
sign.addEventListener('clicked', () => console.log('+/-'));
decimal.addEventListener('clicked', () => console.log('.'));

equals.addEventListener('clicked', () => console.log('='));
clear.addEventListener('clicked', () => console.log('C'));
backspace.addEventListener('clicked', () => console.log('<-'));

pi.addEventListener('clicked', () => console.log('pi'));
sin.addEventListener('clicked', () => console.log('sin'));
cos.addEventListener('clicked', () => console.log('cos'));
tan.addEventListener('clicked', () => console.log('tan'));
csc.addEventListener('clicked', () => console.log('csc'));
sec.addEventListener('clicked', () => console.log('sec'));
cot.addEventListener('clicked', () => console.log('cot'));
arcsin.addEventListener('clicked', () => console.log('arcsin'));
arccos.addEventListener('clicked', () => console.log('arccos'));
arctan.addEventListener('clicked', () => console.log('arctan'));
arccsc.addEventListener('clicked', () => console.log('arccsc'));
arcsec.addEventListener('clicked', () => console.log('arcsec'));
arccot.addEventListener('clicked', () => console.log('arccot'));
degToRad.addEventListener('clicked', () => console.log('Degrees'));

ln.addEventListener('clicked', () => console.log('ln'));
log.addEventListener('clicked', () => console.log('log10'));

openParentheses.addEventListener('clicked', () => console.log('('));
closeParentheses.addEventListener('clicked', () => console.log(')'));
openSquareBrackets.addEventListener('clicked', () => console.log('['));
closeSquareBrackets.addEventListener('clicked', () => console.log(']'));
openCurlyBrace.addEventListener('clicked', () => console.log('{'));
closeCurlyBrace.addEventListener('clicked', () => console.log('}'));

// add to window
const win = new QMainWindow();
win.setWindowTitle("Scientific Calculator");

//const screen = new QTextEdit();
//screen.setPlaceholderText("The Calculator Screen!");
const screen = new QLabel();
screen.setText("The Calculator Screen!");

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

const row1 = new QWidget();
const row1Layout = new FlexLayout();
row1.setObjectName("row1");
row1.setLayout(row1Layout);

/*row1Layout.addWidget(zero);
row1Layout.addWidget(one);
row1Layout.addWidget(two);
row1Layout.addWidget(three);
row1Layout.addWidget(four);
row1Layout.addWidget(five);*/

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

/*row2Layout.addWidget(six);
row2Layout.addWidget(seven);
row2Layout.addWidget(eight);
row2Layout.addWidget(nine);*/

row2Layout.addWidget(cos);
row2Layout.addWidget(arccos);
row2Layout.addWidget(degToRad);
row2Layout.addWidget(ln);
row2Layout.addWidget(exponent);
row2Layout.addWidget(plus);

const row3 = new QWidget();
const row3Layout = new FlexLayout();
row3.setObjectName("row3");
row3.setLayout(row3Layout);

/*row3Layout.addWidget(plus);
row3Layout.addWidget(subtract);
row3Layout.addWidget(times);
row3Layout.addWidget(divide);
row3Layout.addWidget(sign);
row3Layout.addWidget(equals);*/

row3Layout.addWidget(tan);
row3Layout.addWidget(arctan);
row3Layout.addWidget(seven);
row3Layout.addWidget(eight);
row3Layout.addWidget(nine);
row3Layout.addWidget(subtract);

const row4 = new QWidget();
const row4Layout = new FlexLayout();
row4.setObjectName("row4");
row4.setLayout(row4Layout);

row4Layout.addWidget(csc);
row4Layout.addWidget(arccsc);
row4Layout.addWidget(four);
row4Layout.addWidget(five);
row4Layout.addWidget(six);
row4Layout.addWidget(times);

const row5 = new QWidget();
const row5Layout = new FlexLayout();
row5.setObjectName("row5");
row5.setLayout(row5Layout);

row5Layout.addWidget(sec);
row5Layout.addWidget(arcsec);
row5Layout.addWidget(one);
row5Layout.addWidget(two);
row5Layout.addWidget(three);
row5Layout.addWidget(divide);

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

/*
const numberDisplay = new QWidget();
numberDisplay.setObjectName("numberDisplay");
const numberDisplayLayout = new FlexLayout();
numberDisplay.setLayout(numberDisplayLayout);

numberDisplayLayout.addWidget(zero);
numberDisplayLayout.addWidget(one);
numberDisplayLayout.addWidget(two);
numberDisplayLayout.addWidget(three);
numberDisplayLayout.addWidget(four);
numberDisplayLayout.addWidget(five);
numberDisplayLayout.addWidget(six);
numberDisplayLayout.addWidget(seven);
numberDisplayLayout.addWidget(eight);
numberDisplayLayout.addWidget(nine);

const operatorDisplay = new QWidget();
operatorDisplay.setObjectName("operatorDisplay");
const operatorDisplayLayout = new FlexLayout();
operatorDisplay.setLayout(operatorDisplayLayout);

operatorDisplayLayout.addWidget(plus);
operatorDisplayLayout.addWidget(subtract);
operatorDisplayLayout.addWidget(times);
operatorDisplayLayout.addWidget(divide);
operatorDisplayLayout.addWidget(sign);
operatorDisplayLayout.addWidget(equals);
operatorDisplayLayout.addWidget(clear);
operatorDisplayLayout.addWidget(backspace);

const functionDisplay = new QWidget();
functionDisplay.setObjectName("functionDisplay");
const functionDisplayLayout = new FlexLayout();
functionDisplay.setLayout(functionDisplayLayout);

functionDisplayLayout.addWidget(pi);
functionDisplayLayout.addWidget(sin);
functionDisplayLayout.addWidget(cos);
functionDisplayLayout.addWidget(tan);
functionDisplayLayout.addWidget(csc);
functionDisplayLayout.addWidget(sec);
functionDisplayLayout.addWidget(cot);
functionDisplayLayout.addWidget(arcsin);
functionDisplayLayout.addWidget(arccos);
functionDisplayLayout.addWidget(arctan);
functionDisplayLayout.addWidget(arccsc);
functionDisplayLayout.addWidget(arcsec);
functionDisplayLayout.addWidget(arccot);
functionDisplayLayout.addWidget(degToRad);
functionDisplayLayout.addWidget(ln);
functionDisplayLayout.addWidget(log);

buttonDisplay.layout.addWidget(numberDisplay);
buttonDisplay.layout.addWidget(operatorDisplay);
buttonDisplay.layout.addWidget(functionDisplay);*/


win.setStyleSheet(
  `
      #myroot {
        background-color: #009688;
        height: '100%';
        align-items: 'center';
        justify-content: 'center';
        flex: 1;
      }

      #screenDisplay {
          flex: 1;
      }    

      #buttonDisplay {
        background-color: orange;
        flex: 1;
        flex-direction: column;
      }

      #row1, #row2, #row3, #row4, #row5, #row6, #row7, #row8, #row9 {
        flex: 1;
        flex-direction: row;
      }
    `
);

/*win.setStyleSheet(
  `
      #myroot {
        background-color: #009688;
        height: '100%';
        align-items: 'center';
        justify-content: 'center';
        flex: 1;
      }

      #screenDisplay {
          flex: 1;
      }

      #numberDisplay {
        flex: 1;
        //flex-direction: row;
        //background-color: yellow;
        //margin-left: 50px;
        //left: 60px;
        //flex-wrap: wrap;
      }

      #operatorDisplay {
        flex: 1;
      }

      #functionDisplay {
        flex: 1;
      }
    `
);*/

export { win };

/*
rootLayout.addWidget(screen);
rootLayout.addWidget(zero);
rootLayout.addWidget(one);
rootLayout.addWidget(two);
rootLayout.addWidget(three);
rootLayout.addWidget(four);
rootLayout.addWidget(five);
rootLayout.addWidget(six);
rootLayout.addWidget(seven);
rootLayout.addWidget(eight);
rootLayout.addWidget(nine);
rootLayout.addWidget(plus);
rootLayout.addWidget(subtract);
rootLayout.addWidget(times);
rootLayout.addWidget(divide);
rootLayout.addWidget(sign);
rootLayout.addWidget(equals);
rootLayout.addWidget(clear);
rootLayout.addWidget(backspace);
rootLayout.addWidget(pi);
rootLayout.addWidget(sin);
rootLayout.addWidget(cos);
rootLayout.addWidget(tan);
rootLayout.addWidget(csc);
rootLayout.addWidget(sec);
rootLayout.addWidget(cot);
rootLayout.addWidget(arcsin);
rootLayout.addWidget(arccos);
rootLayout.addWidget(arctan);
rootLayout.addWidget(arccsc);
rootLayout.addWidget(arcsec);
rootLayout.addWidget(arccot);
rootLayout.addWidget(degToRad);
rootLayout.addWidget(ln);
rootLayout.addWidget(log);*/
