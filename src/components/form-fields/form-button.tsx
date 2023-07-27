import Button from '@mui/material/Button';

type PropsType = {
  buttonWidth: string,
  buttonTitle: string,
  action: () => void
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
          borderColor: '#e2958c'
        }
      }}
      variant="outlined"
      onClick={action}
    >
      {buttonTitle}
    </Button>
  );
};

export default FormButton;