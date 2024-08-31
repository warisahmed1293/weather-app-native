import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useSpring, animated } from '@react-spring/native';

const Account = () => {

    const [isToggled, setToggle] = React.useState(false);

    const AnimatedView = animated(View);
    const styles = useSpring({
        to: { opacity: isToggled ? 1 : 0 },
        from: { opacity: 0 },
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AnimatedView style={{ ...styles, height: 100, width: 100, backgroundColor: 'tomato' }}>
                <Text>Fading Box</Text>
            </AnimatedView>
            <Button title="Toggle" onPress={() => setToggle(!isToggled)} />
        </View>
    );
};

export default Account;

const styles = StyleSheet.create({});