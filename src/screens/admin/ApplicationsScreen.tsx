import React, { useCallback } from 'react';
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
const applicationsData = [
  {
    id: '1',
    customer: 'Rahul Sharma',
    product: 'Samsung TV',
    loan: '₹40,000',
    dealer: 'Tech World',
    status: 'pending',
    date: '2024-03-11',
  },
  {
    id: '2',
    customer: 'Amit Patil',
    product: 'iPhone 14',
    loan: '₹65,000',
    dealer: 'Mobile Hub',
    status: 'approved',
    date: '2024-03-11',
  },
  {
    id: '3',
    customer: 'Priya Singh',
    product: 'Laptop Dell',
    loan: '₹55,000',
    dealer: 'Electronics Store',
    status: 'pending',
    date: '2024-03-10',
  },
  {
    id: '4',
    customer: 'Vikram Reddy',
    product: 'Refrigerator',
    loan: '₹35,000',
    dealer: 'Tech World',
    status: 'rejected',
    date: '2024-03-10',
  },
  {
    id: '5',
    customer: 'Anita Desai',
    product: 'Washing Machine',
    loan: '₹28,000',
    dealer: 'Mobile Hub',
    status: 'approved',
    date: '2024-03-09',
  },
];

const ApplicationsScreen = ({ navigation }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'rejected':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  const renderApplicationCard = useCallback(({ item }: any) => (
    <TouchableOpacity
      style={styles.applicationCard}
      onPress={() => navigation.navigate('LoanDetails', { loanId: item.id })}
    >
      <View style={styles.applicationHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.productName}>{item.product}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.applicationDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loan Amount:</Text>
          <Text style={styles.loanAmount}>{item.loan}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Dealer:</Text>
          <Text style={styles.dealerName}>{item.dealer}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.applicationDate}>{item.date}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="visibility" size={20} color={colors.primary} />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        {item.status === 'pending' && (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="check-circle" size={20} color={colors.success} />
              <Text style={[styles.actionText, { color: colors.success }]}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="cancel" size={20} color={colors.danger} />
              <Text style={[styles.actionText, { color: colors.danger }]}>Reject</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Loan Applications</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={applicationsData}
        renderItem={renderApplicationCard}
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
  filterButton: {
    padding: spacing.sm,
  },
  listContainer: {
    padding: spacing.lg,
  },
  applicationCard: {
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
  applicationHeader: {
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
  productName: {
    ...typography.body2,
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
  applicationDetails: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  loanAmount: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  dealerName: {
    ...typography.body2,
    color: colors.text,
  },
  applicationDate: {
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
  actionText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
});

export default ApplicationsScreen;
