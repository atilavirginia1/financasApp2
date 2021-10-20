import React from "react";
import {Picker as RNPickerSelect} from '@react-native-community/picker';
import { PickerView } from "./style";

type Props = {
    onChange: React.Dispatch<React.SetStateAction<string>>,
    tipo: string
}

export default function Picker({onChange, tipo}: Props){
    return(
        <PickerView>
            <RNPickerSelect
                style={{
                    width: '100%'
                    }
                }
                selectedValue={tipo}
                onValueChange={(valor) => onChange(valor.toString())}
            >
                <RNPickerSelect.Item label="Receita" value="receita" />
                <RNPickerSelect.Item label="Despesa" value="despesa" />
            </RNPickerSelect>

        </PickerView>
    )
}