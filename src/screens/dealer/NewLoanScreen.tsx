import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, borderRadius, typography } from '../../theme';

const NewLoanScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form states
  const [product, setProduct] = useState({
    category: '',
    brand: '',
    model: '',
    price: '',
  });
  const [loanDetails, setLoanDetails] = useState({
    downPayment: '',
    loanAmount: '',
    interest: '',
    tenure: '',
    emi: '',
  });
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    dob: '',
    address: '',
    occupation: '',
  });

  const steps = [
    { title: 'Product', icon: 'shopping-cart' },
    { title: 'Loan Details', icon: 'account-balance' },
    { title: 'Customer', icon: 'person' },
    { title: 'KYC', icon: 'verified-user' },
    { title: 'Submit', icon: 'check-circle' },
  ];

  const calculateEMI = () => {
    const principal = parseFloat(loanDetails.loanAmount) || 0;
    const rate = (parseFloat(loanDetails.interest) || 0) / 12 / 100;
    const time = parseFloat(loanDetails.tenure) || 1;
    
    if (principal > 0 && rate > 0 && time > 0) {
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      setLoanDetails(prev => ({ ...prev, emi: emi.toFixed(2) }));
    }
  };

  const validateCurrentStep = () => {
    switch(currentStep) {
      case 1:
        if (!product.category || !product.brand || !product.model || !product.price) {
          Alert.alert('Validation Error', 'Please fill in all product details.');
          return false;
        }
        return true;
      case 2:
        if (!loanDetails.downPayment || !loanDetails.loanAmount || !loanDetails.interest || !loanDetails.tenure) {
          Alert.alert('Validation Error', 'Please fill in all loan details.');
          return false;
        }
        return true;
      case 3:
        if (!customer.name || !customer.phone || !customer.dob || !customer.address || !customer.occupation) {
          Alert.alert('Validation Error', 'Please fill in all customer details.');
          return false;
        }
        if (customer.phone.length < 10) {
          Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
          return false;
        }
        return true;
      case 4:
        // skip KYC upload validation in mock for now
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Loan application submitted successfully!');
    navigation.navigate('Applications');
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.progressStep}>
          <View style={[
            styles.progressCircle,
            index + 1 <= currentStep && styles.progressCircleActive
          ]}>
            <Icon
              name={step.icon}
              size={16}
              color={index + 1 <= currentStep ? colors.surface : colors.textSecondary}
            />
          </View>
          <Text style={[
            styles.progressText,
            index + 1 <= currentStep && styles.progressTextActive
          ]}>
            {step.title}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderProductStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Product Information</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Electronics, Furniture"
          value={product.category}
          onChangeText={(text) => setProduct(prev => ({ ...prev, category: text }))}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Samsung, Apple"
          value={product.brand}
          onChangeText={(text) => setProduct(prev => ({ ...prev, brand: text }))}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Model</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Galaxy S23, iPhone 14"
          value={product.model}
          onChangeText={(text) => setProduct(prev => ({ ...prev, model: text }))}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Price (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={product.price}
          onChangeText={(text) => setProduct(prev => ({ ...prev, price: text }))}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderLoanDetailsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Loan Details</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Down Payment (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={loanDetails.downPayment}
          onChangeText={(text) => {
            setLoanDetails(prev => ({ ...prev, downPayment: text }));
            calculateEMI();
          }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Loan Amount (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={loanDetails.loanAmount}
          onChangeText={(text) => {
            setLoanDetails(prev => ({ ...prev, loanAmount: text }));
            calculateEMI();
          }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Interest Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={loanDetails.interest}
          onChangeText={(text) => {
            setLoanDetails(prev => ({ ...prev, interest: text }));
            calculateEMI();
          }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tenure (months)</Text>
        <TextInput
          style={styles.input}
          placeholder="12"
          value={loanDetails.tenure}
          onChangeText={(text) => {
            setLoanDetails(prev => ({ ...prev, tenure: text }));
            calculateEMI();
          }}
          keyboardType="numeric"
        />
      </View>

      {loanDetails.emi && (
        <View style={styles.emiContainer}>
          <Text style={styles.emiLabel}>Calculated EMI</Text>
          <Text style={styles.emiValue}>₹{loanDetails.emi}/month</Text>
        </View>
      )}
    </View>
  );

  const renderCustomerStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Customer Details</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Customer Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter customer name"
          value={customer.name}
          onChangeText={(text) => setCustomer(prev => ({ ...prev, name: text }))}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={customer.phone}
          onChangeText={(text) => setCustomer(prev => ({ ...prev, phone: text }))}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={customer.dob}
          onChangeText={(text) => setCustomer(prev => ({ ...prev, dob: text }))}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter complete address"
          value={customer.address}
          onChangeText={(text) => setCustomer(prev => ({ ...prev, address: text }))}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter occupation"
          value={customer.occupation}
          onChangeText={(text) => setCustomer(prev => ({ ...prev, occupation: text }))}
        />
      </View>
    </View>
  );

  const renderKYCStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>KYC Documents</Text>
      
      <View style={styles.documentUpload}>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="cloud-upload" size={40} color={colors.primary} />
          <Text style={styles.uploadText}>Upload Aadhaar Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.documentUpload}>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="cloud-upload" size={40} color={colors.primary} />
          <Text style={styles.uploadText}>Upload PAN Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.documentUpload}>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="camera-alt" size={40} color={colors.primary} />
          <Text style={styles.uploadText}>Upload Customer Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.documentUpload}>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="receipt" size={40} color={colors.primary} />
          <Text style={styles.uploadText}>Upload Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSubmitStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      
      <View style={styles.reviewCard}>
        <Text style={styles.reviewTitle}>Product Details</Text>
        <Text style={styles.reviewText}>{product.brand} {product.model}</Text>
        <Text style={styles.reviewText}>Price: ₹{product.price}</Text>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewTitle}>Loan Details</Text>
        <Text style={styles.reviewText}>Loan Amount: ₹{loanDetails.loanAmount}</Text>
        <Text style={styles.reviewText}>EMI: ₹{loanDetails.emi}/month</Text>
        <Text style={styles.reviewText}>Tenure: {loanDetails.tenure} months</Text>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewTitle}>Customer Details</Text>
        <Text style={styles.reviewText}>{customer.name}</Text>
        <Text style={styles.reviewText}>{customer.phone}</Text>
        <Text style={styles.reviewText}>{customer.address}</Text>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By submitting this application, you confirm that all information provided is accurate and complete.
        </Text>
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderProductStep();
      case 2:
        return renderLoanDetailsStep();
      case 3:
        return renderCustomerStep();
      case 4:
        return renderKYCStep();
      case 5:
        return renderSubmitStep();
      default:
        return renderProductStep();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Loan Application</Text>
      </View>

      {renderProgressBar()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.backButton, currentStep === 1 && styles.disabledButton]}
          onPress={handleBack}
          disabled={currentStep === 1}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  progressCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  progressTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  stepContainer: {
    paddingBottom: spacing.xl,
  },
  stepTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  emiContainer: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  emiLabel: {
    ...typography.body1,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  emiValue: {
    ...typography.h2,
    color: colors.surface,
    fontWeight: 'bold',
  },
  documentUpload: {
    marginBottom: spacing.lg,
  },
  uploadButton: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  uploadText: {
    ...typography.body1,
    color: colors.primary,
    marginTop: spacing.md,
    fontWeight: '600',
  },
  reviewCard: {
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
  reviewTitle: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  reviewText: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  termsContainer: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  termsText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabledButton: {
    opacity: 0.5,
  },
  backButtonText: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  nextButtonText: {
    ...typography.body1,
    color: colors.surface,
    fontWeight: '600',
  },
});

export default NewLoanScreen;
