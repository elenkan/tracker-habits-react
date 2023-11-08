import Button from '@mui/material/Button';

interface PropsType {
  buttonWidth: string;
  buttonTitle: string;
  action: () => void;
}

const FormButton = ({buttonWidth, buttonTitle, action}: PropsType) => {
  return (
    <Button
      sx={{
        backgroundColor: 'button.background',
        borderColor: '#e2958c',
        color: 'button.text',
        width: buttonWidth,
        margin: '0 auto',
        ':hover': {
          backgroundColor: 'rgba(226,149,140, 0.9)',
          borderColor: '#e2958c',
          color: '#fff',
        },
        '@media (max-width: 600px)': {
          width: '100%',
          fontSize: '13px',
        },
      }}
      variant="outlined"
      onClick={action}>
      {buttonTitle}
    </Button>
  );
};

export default FormButton;
