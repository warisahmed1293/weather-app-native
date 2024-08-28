// DropdownMenu.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';

const DropdownMenu = ({ visible, onClose }) => {
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [visible, onClose]);
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => alert('Option 1')}>
                        <Text style={styles.menuItem}>Option 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Option 2')}>
                        <Text style={styles.menuItem}>Option 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Option 3')}>
                        <Text style={styles.menuItem}>Option 3</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    menu: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: 200,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        height: 500,
    },
    menuItem: {
        padding: 10,
        fontSize: 16,
    },
});

export default DropdownMenu;
