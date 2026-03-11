import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, borderRadius, typography } from '../../theme';

// Mock data
const dealersData = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    shopName: 'Tech World',
    city: 'Mumbai',
    activeLoans: 12,
    status: 'active',
    phone: '9876543210',
  },
  {
    id: '2',
    name: 'Amit Singh',
    shopName: 'Mobile Hub',
    city: 'Delhi',
    activeLoans: 8,
    status: 'active',
    phone: '9876543211',
  },
  {
    id: '3',
    name: 'Priya Patel',
    shopName: 'Electronics Store',
    city: 'Bangalore',
    activeLoans: 15,
    status: 'suspended',
    phone: '9876543212',
  },
];

const DealersScreen = ({ navigation }: any) => {
  const renderDealerCard = ({ item }: any) => (
    <View style={styles.dealerCard}>
      <View style={styles.dealerHeader}>
        <View style={styles.dealerInfo}>
          <Text style={styles.dealerName}>{item.name}</Text>
          <Text style={styles.shopName}>{item.shopName}</Text>
          <Text style={styles.city}>{item.city}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? colors.success : colors.danger }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.dealerStats}>
        <Text style={styles.activeLoans}>Active Loans: {item.activeLoans}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('DealerDetails', { dealerId: item.id })}
        >
          <Icon name="visibility" size={20} color={colors.primary} />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, item.status === 'active' && styles.suspendButton]}
        >
          <Icon name={item.status === 'active' ? 'block' : 'check-circle'} size={20} color={item.status === 'active' ? colors.warning : colors.success} />
          <Text style={[styles.actionText, { color: item.status === 'active' ? colors.warning : colors.success }]}>
            {item.status === 'active' ? 'Suspend' : 'Activate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="edit" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dealers Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddDealer')}
        >
          <Icon name="add" size={20} color={colors.surface} />
          <Text style={styles.addButtonText}>Add Dealer</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dealersData}
        renderItem={renderDealerCard}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  addButtonText: {
    ...typography.body2,
    color: colors.surface,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  listContainer: {
    padding: spacing.lg,
  },
  dealerCard: {
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
  dealerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  shopName: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  city: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '600',
  },
  dealerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activeLoans: {
    ...typography.body2,
    color: colors.text,
  },
  phone: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  suspendButton: {
    // Additional styling for suspend button if needed
  },
  actionText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
});

export default DealersScreen;
