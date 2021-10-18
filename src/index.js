import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import { infixToPostfix, evalPostfix } from './shuntingYard';
import logo from '../assets/logox200.png';

const win = new QMainWindow();
win.setWindowTitle("Hello World");

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const label = new QLabel();
label.setObjectName("mylabel");
label.setText("Hello");

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

})
const button2 = new QPushButton();
button.setText("No, Press me!");
button.addEventListener('clicked', () => {
  //infixToPostfix("36+-25");
  //evalPostfix("36 -25 +")
})

const label2 = new QLabel();
label2.setText("World");
label2.setInlineStyle(`
  color: red;
`);

//rootLayout.addWidget(label);
rootLayout.addWidget(button);
rootLayout.addWidget(button2);
//rootLayout.addWidget(label2);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `
);
win.show();

//(global as any).win = win;
