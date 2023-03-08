
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { Button } from '@app/components/common/buttons/Button/Button';

interface SignUpUserDataProps {
    back: () => void;
    isLoading: boolean;
}

export const SignUpUserData: React.FC<SignUpUserDataProps> = ({back, isLoading}) => {
    const { t } = useTranslation();
    return (<>
        <Auth.FormItem
          name="firstName"
          label={t('common.firstName')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('common.firstName')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="lastName"
          label={t('common.lastName')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('common.lastName')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="email"
          label={t('common.email')}
          rules={[
            {
              type: 'email',
              message: t('common.notValidEmail'),
            },
          ]}
        >
          <Auth.FormInput placeholder={t('common.email')} />
        </Auth.FormItem>
        <Auth.FormItem
          label={'Code'}
          name="code"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={'******'} />
        </Auth.FormItem>
        
        <BaseForm.Item noStyle>
        <Auth.SubmitButton type="ghost" onClick={back}>
          {t('common.back')}
        </Auth.SubmitButton>
      </BaseForm.Item>
      <div style={{height:"0.5rem"}}></div>
      <BaseForm.Item noStyle>
        <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
          {t('common.signUp')}
        </Auth.SubmitButton>
      </BaseForm.Item>
        </>
    )
}