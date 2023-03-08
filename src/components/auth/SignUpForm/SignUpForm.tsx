import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doSignUp } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';
import { Steps } from '@app/components/common/Steps/Steps';
import { SignUpUserData } from './SignUpUserData';
import { SignUpWalletLogin } from './SignUpWalletLogin';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  address: string;
}

const initValues = {
  firstName: '',
  lastName: '',
  email: '',
  code: '',
  address: '',
};

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [address, setAddress] = useState<string>('');
  const { t } = useTranslation();


  const handleSubmit = (values: SignUpFormData) => {
    setLoading(true);
    values.address = address;
    dispatch(doSignUp(values))
      .unwrap()
      .then(() => {
        notificationController.success({
          message: t('auth.signUpSuccessMessage'),
        });
        navigate('/');
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
      });
    setLoading(false);
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <S.Title>{t('auth.signup')}</S.Title>
        <Steps
          size="small"
          current={step - 1}
          items={[
            {
              title: t('signup.step1'),
            },
            {
              title: t('signup.step2'),
            },
          ]}
        />
        <br />

        {step === 1 && (<SignUpWalletLogin address={address} setAddress={setAddress} next={() => setStep(2)} />)}
        {step === 2 && (<SignUpUserData back={() => setStep(1)} isLoading={isLoading} />)}

        <Auth.FooterWrapper>
          <Auth.Text>
            {t('signup.alreadyHaveAccount')}{' '}
            <Link to="/">
              <Auth.LinkText>{t('pageTitle.homePage')}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
