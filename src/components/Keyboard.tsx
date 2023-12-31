import * as React from 'react';
import Button from './Button';
import {View, Text} from 'react-native'
import {Styles} from './styles/GlobalStyles';
import { myColors } from './styles/Colors';

export default function Keyboard(){
    const [firstNumber, setFirstNumber]=React.useState("");
    const [secondNumber, setSecondNumber]=React.useState("");
    const [operation, setOperation]=React.useState("");
    const [result, setResult] = React.useState<Number |null > (null); 

    const handleNumberPress = (buttonValue: string) =>{
        if(firstNumber.length <10){
            setFirstNumber(firstNumber + buttonValue);
        }
    };
    
   const handleOperationPress = (buttonValue: string) => {
  if (firstNumber !== "") {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  }
};


      const handleBackspace = () => {
        if (firstNumber.length > 0) {
            setFirstNumber(firstNumber.slice(0, -1));
        }
    };
    
      const clear = () => {
        setFirstNumber('');
        setSecondNumber('');
        setOperation('');
        setResult(null);
      };
    
      const getResult = () => {
        if (operation && firstNumber) {
          switch (operation) {
            case '+':
              setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
              break;
            case '-':
              setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
              break;
            case '*':
              setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
              break;
            case '/':
              setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
              break;
            case '%':
              setResult((parseFloat(secondNumber) * parseFloat(firstNumber)) / 100);
              break;
            default:
              clear();
              setResult(0);
              break;
          }
          setSecondNumber('');
          setFirstNumber('');
          setOperation('');
        }
      };
    
      const firstNumberDisplay = () => {
        let displayValue = "";
      
        if (result !== null) {
          displayValue = result?.toString();
        } else if (firstNumber) {
          displayValue = secondNumber ? `${secondNumber} ${operation} ${firstNumber}` : firstNumber;
        } else {
          displayValue = "0";
        }
      
        return (
          <Text style={displayValue.length > 5 ? [Styles.screenFirstNumber, { fontSize: 50 }] : Styles.screenFirstNumber}>
            {displayValue}
          </Text>
        );
      };
      

    return(
        <View style={Styles.viewBottom}>
            <View
            style={{
                height:120,
                width:"90%",
                justifyContent:"flex-end",
                alignSelf:"center",
            }}
            
            >
            <Text style={Styles.screenSecondNumber}>
            {secondNumber}
            <Text style={{color:"purple", fontSize:50, fontWeight:'500'}}>{operation}</Text>
            </Text>
            {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button title='C' isRed onPress={clear}/>
                
                <Button title='%' isDark onPress={()=> handleOperationPress("%")} />
                <Button title='⌫' isDark onPress={() => handleBackspace()} />
                <Button title='/' isBlue onPress={()=> handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title='7' isGray onPress={()=> handleNumberPress("7")} />
                <Button title='8' isGray onPress={()=> handleNumberPress("8")} />
                <Button title='9' isGray onPress={()=> handleNumberPress("9")} />
                <Button title='*' isBlue onPress={()=> handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title='4' isGray onPress={()=> handleNumberPress("4")}/>
                <Button title='5' isGray onPress={()=> handleNumberPress("5")} />
                <Button title='6' isGray onPress={()=> handleNumberPress("6")} />
                <Button title='-' isBlue onPress={()=> handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title='1' isGray onPress={()=>handleNumberPress("1")}/>
                <Button title='2' isGray onPress={()=> handleNumberPress("2")} />
                <Button title='3' isGray onPress={()=> handleNumberPress("3")} />
                <Button title='+' isBlue onPress={()=> handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title='.' isGray onPress={()=>handleNumberPress(".")}/>
                <Button title='0' isGray onPress={()=> handleNumberPress("0")} />
                <Button title='00' isGray onPress={()=> handleNumberPress("00")} />
                <Button title='=' isGreen onPress={()=> getResult()} />
            </View>
        
            
        
        </View>

    )
}