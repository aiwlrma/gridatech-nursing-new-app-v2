import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import { SvgIcon } from '../components';
import { COLORS, SIZES } from '../constants';

interface SearchItem {
  id: string;
  title: string;
  description: string;
}

const mockData: SearchItem[] = [
  {
    id: '1',
    title: 'React Native',
    description: '크로스 플랫폼 모바일 앱 개발 프레임워크',
  },
  {
    id: '2',
    title: 'TypeScript',
    description: 'JavaScript의 타입 안전성을 제공하는 언어',
  },
  {
    id: '3',
    title: 'Expo',
    description: 'React Native 개발을 위한 플랫폼',
  },
  {
    id: '4',
    title: 'iOS',
    description: 'Apple의 모바일 운영체제',
  },
  {
    id: '5',
    title: 'Android',
    description: 'Google의 모바일 운영체제',
  },
];

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(mockData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData(mockData);
    } else {
      const filtered = mockData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderSearchItem = ({ item }: { item: SearchItem }) => (
    <View style={styles.searchItem}>
      <View style={styles.itemIcon}>
        <SvgIcon name="search" size={20} color={COLORS.primary} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>검색</Text>
        
        <View style={styles.searchContainer}>
          <SvgIcon name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <SvgIcon
              name="close"
              size={20}
              color={COLORS.textSecondary}
              style={styles.clearIcon}
              onPress={() => handleSearch('')}
            />
          )}
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <SvgIcon name="search" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.spacing.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: SIZES.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius.lg,
    paddingHorizontal: SIZES.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SIZES.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.fontSize.md,
    color: COLORS.text,
    paddingVertical: SIZES.spacing.md,
  },
  clearIcon: {
    marginLeft: SIZES.spacing.sm,
  },
  listContainer: {
    padding: SIZES.spacing.md,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.spacing.md,
    borderRadius: SIZES.borderRadius.md,
    marginBottom: SIZES.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.spacing.md,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: SIZES.fontSize.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
  },
  itemDescription: {
    fontSize: SIZES.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.spacing.xxl,
  },
  emptyText: {
    fontSize: SIZES.fontSize.md,
    color: COLORS.textSecondary,
    marginTop: SIZES.spacing.md,
  },
});
