import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, borderRadius, typography } from '../../theme';

// Mock data
const customersData = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '9876543210',
    totalLoans: 3,
    activeLoans: 1,
    city: 'Mumbai',
  },
  {
    id: '2',
    name: 'Amit Patil',
    phone: '9876543211',
    totalLoans: 2,
    activeLoans: 2,
    city: 'Delhi',
  },
  {
    id: '3',
    name: 'Priya Singh',
    phone: '9876543212',
    totalLoans: 5,
    activeLoans: 1,
    city: 'Bangalore',
  },
  {
    id: '4',
    name: 'Vikram Reddy',
    phone: '9876543213',
    totalLoans: 1,
    activeLoans: 0,
    city: 'Hyderabad',
  },
];

const CustomersScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');

  const renderCustomerCard = useCallback(({ item }: any) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => navigation.navigate('CustomerDetails', { customerId: item.id })}
    >
      <View style={styles.customerHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.city}>{item.city}</Text>
        </View>
        <View style={styles.loanStats}>
          <Text style={styles.totalLoans}>Total: {item.totalLoans}</Text>
          <Text style={styles.activeLoans}>Active: {item.activeLoans}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="visibility" size={20} color={colors.primary} />
          <Text style={styles.actionText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="history" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Loan History</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={customersData}
        renderItem={renderCustomerCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  customerCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  phone: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  city: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  loanStats: {
    alignItems: 'flex-end',
  },
  totalLoans: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  activeLoans: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  actionText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
});

export default CustomersScreen;
