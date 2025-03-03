import React from 'react';
import { StyleSheet, Text, Dimensions} from 'react-native';

import { useErrorApi } from '../../context/ErrorApi';

const screenWidth = Dimensions.get('window').width;
const fontSizeError = screenWidth / 24

export default function Error() {
    const { errorApi } = useErrorApi()

    return (
        <>
            {errorApi != "" &&
                <Text style={styles.error}>
                    {errorApi}
                </Text>
            }
        </>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "#ff9090",
        fontSize: fontSizeError,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
        width: '80%',
    },
})
