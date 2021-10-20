import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import { infixToPostfix, evalPostfix } from './shuntingYard';
import { win } from './calcLayout';



win.show();

global.win = win;

/*
const button = new QPushButton();
//button.setIcon(new QIcon(logo));
button.setText("Press me!");
button.addEventListener('clicked', () => {
  //infixToPostfix("36+(-25*5)-72");
  //evalPostfix("36 -25 5 * + 72 -");
  //infixToPostfix("5^(2+2)+2^8-7");
  //evalPostfix("5 2 2 + ^ 2 8 ^ + 7 -");
  //infixToPostfix("sin(30)+cos(60)");
  evalPostfix("30 log 60 ln +");
  //infixToPostfix("ln(56)+log(27)-sin(45/60)");
  //infixToPostfix("36+-25");
  //evalPostfix("36 -25 +")

})*/

