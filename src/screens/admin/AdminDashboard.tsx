import React, { useCallback } from 'react';
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
  { title: 'Total Dealers', value: '45', icon: 'people', color: colors.primary },
  { title: 'Total Applications', value: '234', icon: 'assignment', color: colors.success },
  { title: 'Approved Loans', value: '189', icon: 'check-circle', color: colors.success },
  { title: 'Pending Loans', value: '45', icon: 'pending', color: colors.warning },
  { title: 'Total Revenue', value: '₹12.5L', icon: 'account-balance', color: colors.primary },
];

const recentApplications = [
  {
    id: '1',
    customer: 'Rahul Sharma',
    product: 'Samsung TV',
    loan: '₹40,000',
    status: 'pending',
    date: '2024-03-11',
  },
  {
    id: '2',
    customer: 'Amit Patil',
    product: 'iPhone 14',
    loan: '₹65,000',
    status: 'approved',
    date: '2024-03-11',
  },
  {
    id: '3',
    customer: 'Priya Singh',
    product: 'Laptop Dell',
    loan: '₹55,000',
    status: 'pending',
    date: '2024-03-10',
  },
  {
    id: '4',
    customer: 'Vikram Reddy',
    product: 'Refrigerator',
    loan: '₹35,000',
    status: 'rejected',
    date: '2024-03-10',
  },
];

const AdminDashboard = ({ navigation }: any) => {
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

  const renderStatCard = useCallback(({ item }: any) => (
    <View style={[styles.statCard, { borderLeftColor: item.color }]}>
      <View style={styles.statIcon}>
        <Icon name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statTitle}>{item.title}</Text>
    </View>
  ), []);

  const renderApplicationCard = useCallback(({ item }: any) => (
    <TouchableOpacity
      style={styles.applicationCard}
      onPress={() => navigation.navigate('LoanDetails', { loanId: item.id })}
    >
      <View style={styles.applicationHeader}>
        <Text style={styles.customerName}>{item.customer}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.productName}>{item.product}</Text>
      <View style={styles.applicationFooter}>
        <Text style={styles.loanAmount}>{item.loan}</Text>
        <Text style={styles.applicationDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={colors.gradient.primary} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.companyName}>{user?.companyName}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="notifications" size={24} color={colors.surface} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

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

        {/* Recent Applications */}
        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Applications</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Applications')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentApplications}
            renderItem={renderApplicationCard}
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
  companyName: {
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
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  customerName: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
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
  productName: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  applicationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loanAmount: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: '600',
  },
  applicationDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default AdminDashboard;
