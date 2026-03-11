import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, borderRadius, typography } from '../../theme';

const ReportsScreen = ({ navigation }: any) => {
  const reportCategories = [
    {
      title: 'Monthly Loans',
      icon: 'trending-up',
      color: colors.primary,
      description: 'Track loan applications and approvals month by month',
    },
    {
      title: 'Dealer Performance',
      icon: 'people',
      color: colors.success,
      description: 'Analyze dealer performance metrics and rankings',
    },
    {
      title: 'Revenue Analytics',
      icon: 'account-balance',
      color: colors.warning,
      description: 'Monitor revenue streams and financial performance',
    },
    {
      title: 'EMI Collection',
      icon: 'payment',
      color: colors.danger,
      description: 'Track EMI payments and collection efficiency',
    },
    {
      title: 'Product Analysis',
      icon: 'category',
      color: colors.primary,
      description: 'Analyze product-wise loan distribution',
    },
    {
      title: 'Customer Demographics',
      icon: 'person',
      color: colors.success,
      description: 'Understand customer distribution and patterns',
    },
  ];

  const renderReportCard = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.reportCard}
      onPress={() => navigation.navigate('ReportDetails', { reportType: item.title })}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={30} color={colors.surface} />
      </View>
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportDescription}>{item.description}</Text>
      <View style={styles.reportFooter}>
        <Text style={styles.viewReportText}>View Report</Text>
        <Icon name="arrow-forward" size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Icon name="download" size={20} color={colors.surface} />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Quick Summary</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>₹12.5L</Text>
              <Text style={styles.summaryLabel}>Total Revenue</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>234</Text>
              <Text style={styles.summaryLabel}>Total Loans</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>89%</Text>
              <Text style={styles.summaryLabel}>EMI Collection</Text>
            </View>
          </View>
        </View>

        <View style={styles.reportsContainer}>
          <Text style={styles.sectionTitle}>Detailed Reports</Text>
          {reportCategories.map((item, index) => renderReportCard(item, index))}
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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  exportButtonText: {
    ...typography.body2,
    color: colors.surface,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  summaryContainer: {
    padding: spacing.lg,
  },
  summaryTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  reportsContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  reportCard: {
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
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  reportTitle: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  reportDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewReportText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default ReportsScreen;
