import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { ChevronDown, User } from 'lucide-react-native';

export interface Professor {
  id: string;
  name: string;
  department: string;
  email?: string;
}

interface ProfessorSelectorProps {
  professors: Professor[];
  selectedProfessor: Professor | null;
  onProfessorSelect: (professor: Professor) => void;
  placeholder?: string;
}

export const ProfessorSelector: React.FC<ProfessorSelectorProps> = ({
  professors,
  selectedProfessor,
  onProfessorSelect,
  placeholder = '교수를 선택해주세요',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (professor: Professor) => {
    onProfessorSelect(professor);
    setIsOpen(false);
  };

  const renderProfessorItem = ({ item }: { item: Professor }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => handleSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.optionContent}>
        <View style={styles.professorIcon}>
          <User size={20} color="#6B7280" />
        </View>
        <View style={styles.professorInfo}>
          <Text style={styles.professorName}>{item.name}</Text>
          <Text style={styles.professorDepartment}>{item.department}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <View style={styles.selectorContent}>
          <View style={styles.professorIcon}>
            <User size={20} color="#6B7280" />
          </View>
          <View style={styles.selectorText}>
            {selectedProfessor ? (
              <>
                <Text style={styles.selectedName}>{selectedProfessor.name}</Text>
                <Text style={styles.selectedDepartment}>{selectedProfessor.department}</Text>
              </>
            ) : (
              <Text style={styles.placeholder}>{placeholder}</Text>
            )}
          </View>
          <ChevronDown size={20} color="#9CA3AF" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>교수 선택</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsOpen(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={professors}
              keyExtractor={(item) => item.id}
              renderItem={renderProfessorItem}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  professorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectorText: {
    flex: 1,
  },
  selectedName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 2,
  },
  selectedDepartment: {
    fontSize: 14,
    color: '#6B7280',
  },
  placeholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxHeight: '70%',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professorInfo: {
    flex: 1,
  },
  professorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 2,
  },
  professorDepartment: {
    fontSize: 14,
    color: '#6B7280',
  },
});