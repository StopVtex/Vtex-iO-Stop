import React, { useState } from 'react'
import { Input } from './components'
import MasterData from './services/MasterData'
import styles from './styles.css'

const dataFields = {
  nombres: {
    type: 'text',
    name: 'nombres',
    label: '',
    placeholder: 'Nombre'
  },
  surname: {
    type: 'text',
    name: 'surname',
    label: 'Apellido',
    placeholder: 'Apellido'
  },

  email: {
    type: 'email',
    name: 'email',
    label: 'correo@correo.com',
    placeholder: 'correo@correo.com'
  }
}

const initialDataForm = {
  email: '',
  nombres: '',
  surname: ''
}
const initialErrorsDataForm = {
  email: '',
  nombres: '',
  surname: ''
}

interface NewsletterFormProps {
  __terms: 'string',
  __textLink: 'string',
  __link: 'string',
  __btn: 'string'
}

const NewsletterForm = ({ __terms, __textLink, __link, __btn }: NewsletterFormProps) => {

  const masterData = new MasterData('NL')
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const updateCheckBox = (e: any) => {
    setCheckBox(e.target.checked)
  }

  const initialError = {
    status: false,
    valide: false,
    msg: ''
  };

  const [dataForm, setDataForm] = useState<any>(initialDataForm);
  const [errorsDataForm, setErrorsDataForm] = useState<any>(initialErrorsDataForm);
  const [error, setError] = useState<any>(initialError);
  const [submitResultText, setSubmitResultText] = useState('')

  const updateDataForm = ((name: string, value: string) => {
    setDataForm({
      ...dataForm,
      [name]: value
    });
  })

  const clearErrorData = (name: string) => {
    setErrorsDataForm({
      ...errorsDataForm,
      [name]: ''
    })
  }

  const onChange = ((event:
    React.FormEvent<HTMLInputElement> |
    React.FormEvent<HTMLSelectElement> |
    React.FormEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value }: any = target;
    if (value !== '' && errorsDataForm[name] !== '') clearErrorData(name);

    updateDataForm(name, value);
  });



  const validateEmptyFields = () => {

    const errors: any = {};

    Object.keys(dataFields).forEach((name: string) => {
      if (dataForm[name] === '') errors[name] = "* Este campo no puede estar vacío";
    });

    return errors;
  }



  const updateSubmitResultText = (message: string) => {
    setSubmitResultText(message)
    setTimeout(() => {
      setSubmitResultText('')
    }, 6000)
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()
    const resultValidateEmptyFields = validateEmptyFields();

    if (checkBox === false) {
      setError({
        status: true,
        valide: false,
        msg: 'Por favor acepta términos y condiciones'
      });
      setTimeout(() => setError(initialError), 3000)
      return;
    }

    if (Object.values(resultValidateEmptyFields).length) {
      setErrorsDataForm({
        ...errorsDataForm,
        ...resultValidateEmptyFields
      })
      return;
    }
    const resSearchEmailInMD: any = await masterData.get('email', dataForm.email)
    if (resSearchEmailInMD) {
      return updateSubmitResultText('Este email se encuentra en uso')
    }
    const resCreateDocument = await masterData.post(dataForm)
    if (!resCreateDocument) {
      updateSubmitResultText('Ha ocurrido un error, por favor intenta de nuevo')
    }
    updateSubmitResultText('¡Gracias!' + ' ' + 'Tus datos fueron enviados con éxito.')
    window.dispatchEvent(new CustomEvent('custom:newsletterSubmit'))
    setDataForm(initialDataForm)
  }

  return (
    <div className={`${styles.newsletterForm}`}>
      <form onSubmit={onSubmit} >
        <div>
          <div className={`flex relative ${styles.newsletterForm__section} ${styles.newsletterForm__nameAndFormalTitle}`}>
            <Input
              name={dataFields.nombres.name}
              type={dataFields.nombres.type}
              label={dataFields.nombres.label}
              placeholder={dataFields.nombres.placeholder}
              value={dataForm.name}
              onChange={onChange}
              error={errorsDataForm.nombre}
            />
            <Input
              name={dataFields.surname.name}
              type={dataFields.surname.type}
              label={dataFields.surname.label}
              placeholder={dataFields.surname.label}
              value={dataForm.surname}
              onChange={onChange}
              error={errorsDataForm.surname}
            />
          </div>
          <div className={`flex relative ${styles.newsletterForm__emailBtn}`}>
            <Input
              name={dataFields.email.name}
              type={dataFields.email.type}
              label={dataFields.email.label}
              placeholder={dataFields.email.label}
              value={dataForm.email}
              onChange={onChange}
              error={errorsDataForm.email}
            />
            <button
              type="submit" className={`${styles.newsletterForm__submitButton}`}>{__btn}</button>
          </div>
          <div className={styles.groupCheckBox}>
            <input
              type="checkbox"
              name="nl-radio"
              checked={checkBox}
              onChange={updateCheckBox}
              className={styles.checkBox}
              id="checkModal"
            />
            <label htmlFor="checkModal" className={styles.lblCheckbox}>
            </label>
            <div className={` flex ` + styles.textTerms }>
                {__terms } <a href={__link} target='_blank'>{__textLink}</a>
              </div>
          </div>
          <p className={`${styles.newsletterForm__resultMessage} ${error.status && styles.showErrorNewsletter} ${error.valide ? styles.textColorValide : styles.textColorInValide}`}>{error.msg}</p>
          <p className={`tc ${styles.newsletterForm__resultMessage} ${submitResultText ? `${styles['newsletterForm__resultMessage--show']}` : ''}`}>{submitResultText}</p>
        </div>
      </form>
    </div>
  )
}



NewsletterForm.defaultProps = {
  __terms: 'Acepto ',
  __textLink: 'términos y condiciones',
  __link: '/terminos',
  __btn: 'Suscribirme'
}

NewsletterForm.schema = {
  title: 'Newsletter',
  description: 'Configuración',
  type: 'object',
  properties: {
    __terms: {
      title: 'Términos y condiciones',
      type: 'string'
    },
    __textLink: {
      title: 'Texto Link',
      type: 'string'
    },
    __link: {
      title: 'Url Tyc',
      type: 'string'
    },
    __btn: {
      title: 'Texto Boton',
      type: 'string'
    }

  }
}

export default NewsletterForm
