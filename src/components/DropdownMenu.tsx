import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';

const DropdownMenu = ({ visible, onClose, clearStorage }) => {
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 50000);
        }
        return () => clearTimeout(timer);
    }, [visible, onClose]);

    const handleOptionSelect = (action) => {
        action();
        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => handleOptionSelect(clearStorage)}>
                        <Text style={styles.menuItem}>Clear History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOptionSelect(() => alert('Option 2'))}>
                        <Text style={styles.menuItem}>Option 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOptionSelect(() => alert('Option 3'))}>
                        <Text style={styles.menuItem}>Option 3</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    menu: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: 200,
        height: 300,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        padding: 10,
        paddingVertical: 20,
        fontSize: 16,
    },
});

export default DropdownMenu;
