import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, borderRadius, typography } from '../../theme';

// Mock data
const statsData = [
  { title: "Today's Applications", value: '8', icon: 'assignment', color: colors.primary },
  { title: 'Approved Loans', value: '23', icon: 'check-circle', color: colors.success },
  { title: 'Pending Loans', value: '5', icon: 'pending', color: colors.warning },
  { title: 'EMI Due', value: '12', icon: 'payment', color: colors.danger },
];

const recentLoans = [
  {
    id: '1',
    customer: 'Rahul Sharma',
    product: 'Samsung TV',
    loan: '₹40,000',
    status: 'pending',
    date: '2024-03-11',
    emi: '₹3,500',
  },
  {
    id: '2',
    customer: 'Amit Patil',
    product: 'iPhone 14',
    loan: '₹65,000',
    status: 'approved',
    date: '2024-03-11',
    emi: '₹5,800',
  },
  {
    id: '3',
    customer: 'Priya Singh',
    product: 'Laptop Dell',
    loan: '₹55,000',
    status: 'pending',
    date: '2024-03-10',
    emi: '₹4,900',
  },
];

const DealerDashboard = ({ navigation }: any) => {
  const { user } = useAuth();

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

  const renderStatCard = ({ item }: any) => (
    <View style={[styles.statCard, { borderLeftColor: item.color }]}>
      <View style={styles.statIcon}>
        <Icon name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statTitle}>{item.title}</Text>
    </View>
  );

  const renderLoanCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.loanCard}
      onPress={() => navigation.navigate('LoanDetails', { loanId: item.id })}
    >
      <View style={styles.loanHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.productName}>{item.product}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.loanDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loan Amount:</Text>
          <Text style={styles.loanAmount}>{item.loan}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>EMI:</Text>
          <Text style={styles.emiAmount}>{item.emi}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.loanDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={colors.gradient.primary} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.shopName}>{user?.shopName}</Text>
              <Text style={styles.commission}>Commission: {user?.commission}%</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="notifications" size={24} color={colors.surface} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('NewLoan')}
          >
            <Icon name="add-circle" size={30} color={colors.surface} />
            <Text style={styles.quickActionText}>New Loan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Applications')}
          >
            <Icon name="assignment" size={30} color={colors.surface} />
            <Text style={styles.quickActionText}>Applications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Customers')}
          >
            <Icon name="people" size={30} color={colors.surface} />
            <Text style={styles.quickActionText}>Customers</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <FlatList
            data={statsData}
            renderItem={renderStatCard}
            keyExtractor={(item) => item.title}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.statsRow}
          />
        </View>

        {/* Recent Loans */}
        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Loans</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Applications')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentLoans}
            renderItem={renderLoanCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    ...typography.body1,
    color: colors.surface,
    opacity: 0.8,
  },
  userName: {
    ...typography.h2,
    color: colors.surface,
    fontWeight: 'bold',
  },
  shopName: {
    ...typography.body1,
    color: colors.surface,
    opacity: 0.8,
  },
  commission: {
    ...typography.body2,
    color: colors.surface,
    opacity: 0.8,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: colors.danger,
    borderRadius: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: -spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  quickActionButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  quickActionText: {
    ...typography.caption,
    color: colors.text,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  statsContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  statsRow: {
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '48%',
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statTitle: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  recentContainer: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  viewAllButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  viewAllText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  loanCard: {
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
  loanHeader: {
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
  loanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailRow: {
    width: '33%',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  loanAmount: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  emiAmount: {
    ...typography.body2,
    color: colors.success,
    fontWeight: '600',
  },
  loanDate: {
    ...typography.body2,
    color: colors.textSecondary,
  },
});

export default DealerDashboard;
