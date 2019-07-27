const uploadStyle = {
  upload: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'left',
    overflow: 'hidden',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '16px',
    boxSizing: 'border-box',
    width: ' 100%',
  },

  files: {
    marginLeft: '32px',
    alignItems: 'flex-start',
    justifyItems: 'flex-start',
    flex: 1,
    overflowY: 'auto',
  },

  actions: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'column',
    marginTop: '32px',
  },

  title: {
    marginBottom: '32px',
    color: '#555',
  },

  filename: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#555',
  },

  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },

  checkIcon: {
    opacity: 0.5,
    marginLeft: '32px',
  },

  progressWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(103, 58, 183, 1)',
  },
  buttonDisabled: {
    backgroundColor: 'rgb(189, 189, 189)',
  },
  dividerNote: {
    color: 'red',
  },
};

export default uploadStyle;
