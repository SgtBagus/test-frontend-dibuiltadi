// MUI Imports
import type { Theme } from '@mui/material/styles'

const brandColorsLight = {
  primary: {
    main: '#1e90ff',
    light: '#52a8ff',
    dark: '#0075eb',
    contrastText: '#FFF'
  },
  secondary: {
    main: '#6D788D',
    light: '#8A93A4',
    dark: '#626C7F',
    contrastText: '#FFF'
  },
  error: {
    main: '#EB3D47',
    light: '#F07179',
    dark: '#AC2D34',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
    contrastText: '#FFFFFF'
  },
  info: {
    main: '#26C6F9',
    light: '#51D1FA',
    dark: '#22B3E1',
    contrastText: '#023e52'
  },
  success: {
    main: '#21A366',
    light: '#25B672',
    dark: '#1D8C58',
    contrastText: '#FFFFFF'
  }
}

const brandColorsDark = {
  ...brandColorsLight,
  warning: {
    main: '#FFA726',
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: 'var(--mui-palette-background-default)'
  }
}

const colorSchemes = (): Theme['colorSchemes'] => {
  return {
    light: {
      palette: {
        primary: {
          main: brandColorsLight.primary.main,
          light: brandColorsLight.primary.light,
          dark: brandColorsLight.primary.dark,
          contrastText: brandColorsLight.primary.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.38)'
        },
        secondary: {
          main: brandColorsLight.secondary.main,
          light: brandColorsLight.secondary.light,
          dark: brandColorsLight.secondary.dark,
          contrastText: brandColorsLight.secondary.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)'
        },
        error: {
          main: brandColorsLight.error.main,
          light: brandColorsLight.error.light,
          dark: brandColorsLight.error.dark,
          contrastText: brandColorsLight.error.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.38)'
        },
        warning: {
          main: brandColorsLight.warning.main,
          light: brandColorsLight.warning.light,
          dark: brandColorsLight.warning.dark,
          contrastText: '#FFF',
          lighterOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.38)'
        },
        info: {
          main: brandColorsLight.info.main,
          light: brandColorsLight.info.light,
          dark: brandColorsLight.info.dark,
          contrastText: brandColorsLight.info.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.38)'
        },
        success: {
          main: brandColorsLight.success.main,
          light: brandColorsLight.success.light,
          dark: brandColorsLight.success.dark,
          contrastText: brandColorsLight.success.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.38)'
        },
        text: {
          primary: `rgb(var(--mui-mainColorChannels-light) / 0.9)`,
          secondary: `rgb(var(--mui-mainColorChannels-light) / 0.7)`,
          disabled: `rgb(var(--mui-mainColorChannels-light) / 0.4)`,
          primaryChannel: 'var(--mui-mainColorChannels-light)',
          secondaryChannel: 'var(--mui-mainColorChannels-light)'
        },
        divider: `rgb(var(--mui-mainColorChannels-light) / 0.12)`,
        dividerChannel: 'var(--mui-mainColorChannels-light)',
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
          paperChannel: '255 255 255'
        },
        action: {
          active: `rgb(var(--mui-mainColorChannels-light) / 0.6)`,
          hover: `rgb(var(--mui-mainColorChannels-light) / 0.06)`,
          selected: `rgb(var(--mui-mainColorChannels-light) / 0.08)`,
          disabled: `rgb(var(--mui-mainColorChannels-light) / 0.3)`,
          disabledBackground: `rgb(var(--mui-mainColorChannels-light) / 0.16)`,
          focus: `rgb(var(--mui-mainColorChannels-light) / 0.1)`,
          focusOpacity: 0.1,
          activeChannel: 'var(--mui-mainColorChannels-light)',
          selectedChannel: 'var(--mui-mainColorChannels-light)'
        },
        Alert: {
          errorColor: 'var(--mui-palette-error-main)',
          warningColor: 'var(--mui-palette-warning-main)',
          infoColor: 'var(--mui-palette-info-main)',
          successColor: 'var(--mui-palette-success-main)',
          errorStandardBg: 'var(--mui-palette-error-lightOpacity)',
          warningStandardBg: 'var(--mui-palette-warning-lightOpacity)',
          infoStandardBg: 'var(--mui-palette-info-lightOpacity)',
          successStandardBg: 'var(--mui-palette-success-lightOpacity)',
          errorFilledColor: 'var(--mui-palette-error-contrastText)',
          warningFilledColor: 'var(--mui-palette-warning-contrastText)',
          infoFilledColor: 'var(--mui-palette-info-contrastText)',
          successFilledColor: 'var(--mui-palette-success-contrastText)',
          errorFilledBg: 'var(--mui-palette-error-main)',
          warningFilledBg: 'var(--mui-palette-warning-main)',
          infoFilledBg: 'var(--mui-palette-info-main)',
          successFilledBg: 'var(--mui-palette-success-main)'
        },
        Avatar: {
          defaultBg: '#F0EFF0'
        },
        Chip: {
          defaultBorder: 'var(--mui-palette-divider)'
        },
        FilledInput: {
          bg: 'var(--mui-palette-action-hover)',
          hoverBg: 'var(--mui-palette-action-selected)',
          disabledBg: 'var(--mui-palette-action-hover)'
        },
        LinearProgress: {
          primaryBg: 'var(--mui-palette-primary-lightOpacity)',
          secondaryBg: 'var(--mui-palette-secondary-lightOpacity)',
          errorBg: 'var(--mui-palette-error-lightOpacity)',
          warningBg: 'var(--mui-palette-warning-lightOpacity)',
          infoBg: 'var(--mui-palette-info-lightOpacity)',
          successBg: 'var(--mui-palette-success-lightOpacity)'
        },
        SnackbarContent: {
          bg: '#282A42',
          color: 'var(--mui-palette-background-paper)'
        },
        Switch: {
          defaultColor: 'var(--mui-palette-common-white)',
          defaultDisabledColor: 'var(--mui-palette-common-white)',
          primaryDisabledColor: 'var(--mui-palette-common-white)',
          secondaryDisabledColor: 'var(--mui-palette-common-white)',
          errorDisabledColor: 'var(--mui-palette-common-white)',
          warningDisabledColor: 'var(--mui-palette-common-white)',
          infoDisabledColor: 'var(--mui-palette-common-white)',
          successDisabledColor: 'var(--mui-palette-common-white)'
        },
        Tooltip: {
          bg: '#282A42'
        },
        TableCell: {
          border: 'var(--mui-palette-divider)'
        },
        customColors: {
          bodyBg: '#F7F7F9',
          chatBg: '#F7F6FA',
          greyLightBg: '#FAFAFA',
          inputBorder: `rgb(var(--mui-mainColorChannels-light) / 0.22)`,
          tableHeaderBg: '#F5F5F7',
          tooltipText: '#FFFFFF',
          trackBg: '#F5F5F8'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: brandColorsDark.primary.main,
          light: brandColorsDark.primary.light,
          dark: brandColorsDark.primary.dark,
          contrastText: brandColorsDark.primary.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.38)'
        },
        secondary: {
          main: brandColorsDark.secondary.main,
          light: brandColorsDark.secondary.light,
          dark: brandColorsDark.secondary.dark,
          contrastText: brandColorsDark.secondary.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)'
        },
        error: {
          main: brandColorsDark.error.main,
          light: brandColorsDark.error.light,
          dark: brandColorsDark.error.dark,
          contrastText: brandColorsDark.error.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.38)'
        },
        warning: {
          main: brandColorsDark.warning.main,
          light: brandColorsDark.warning.light,
          dark: brandColorsDark.warning.dark,
          contrastText: brandColorsDark.warning.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.38)'
        },
        info: {
          main: brandColorsDark.info.main,
          light: brandColorsDark.info.light,
          dark: brandColorsDark.info.dark,
          contrastText: brandColorsDark.info.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.38)'
        },
        success: {
          main: brandColorsDark.success.main,
          light: brandColorsDark.success.light,
          dark: brandColorsDark.success.dark,
          contrastText: brandColorsDark.success.contrastText,
          lighterOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.38)'
        },
        text: {
          primary: `rgb(var(--mui-mainColorChannels-dark) / 0.9)`,
          secondary: `rgb(var(--mui-mainColorChannels-dark) / 0.7)`,
          disabled: `rgb(var(--mui-mainColorChannels-dark) / 0.4)`,
          primaryChannel: 'var(--mui-mainColorChannels-dark)',
          secondaryChannel: 'var(--mui-mainColorChannels-dark)'
        },
        divider: `rgb(var(--mui-mainColorChannels-dark) / 0.12)`,
        dividerChannel: 'var(--mui-mainColorChannels-dark)',
        background: {
          default: '#1f202a',
          paper: '#1f202a',
          paperChannel: '31 32 42'
        },
        action: {
          active: `rgb(var(--mui-mainColorChannels-dark) / 0.6)`,
          hover: `rgb(var(--mui-mainColorChannels-dark) / 0.06)`,
          selected: `rgb(var(--mui-mainColorChannels-dark) / 0.08)`,
          disabled: `rgb(var(--mui-mainColorChannels-dark) / 0.3)`,
          disabledBackground: `rgb(var(--mui-mainColorChannels-dark) / 0.16)`,
          focus: `rgb(var(--mui-mainColorChannels-dark) / 0.1)`,
          focusOpacity: 0.1,
          activeChannel: 'var(--mui-mainColorChannels-dark)',
          selectedChannel: 'var(--mui-mainColorChannels-dark)'
        },
        Alert: {
          errorColor: 'var(--mui-palette-error-main)',
          warningColor: 'var(--mui-palette-warning-main)',
          infoColor: 'var(--mui-palette-info-main)',
          successColor: 'var(--mui-palette-success-main)',
          errorStandardBg: 'var(--mui-palette-error-lightOpacity)',
          warningStandardBg: 'var(--mui-palette-warning-lightOpacity)',
          infoStandardBg: 'var(--mui-palette-info-lightOpacity)',
          successStandardBg: 'var(--mui-palette-success-lightOpacity)',
          errorFilledColor: 'var(--mui-palette-error-contrastText)',
          warningFilledColor: 'var(--mui-palette-warning-contrastText)',
          infoFilledColor: 'var(--mui-palette-info-contrastText)',
          successFilledColor: 'var(--mui-palette-success-contrastText)',
          errorFilledBg: 'var(--mui-palette-error-main)',
          warningFilledBg: 'var(--mui-palette-warning-main)',
          infoFilledBg: 'var(--mui-palette-info-main)',
          successFilledBg: 'var(--mui-palette-success-main)'
        },
        Avatar: {
          defaultBg: '#383B55'
        },
        Chip: {
          defaultBorder: 'var(--mui-palette-divider)'
        },
        FilledInput: {
          bg: 'var(--mui-palette-action-hover)',
          hoverBg: 'var(--mui-palette-action-selected)',
          disabledBg: 'var(--mui-palette-action-hover)'
        },
        LinearProgress: {
          primaryBg: 'var(--mui-palette-primary-lightOpacity)',
          secondaryBg: 'var(--mui-palette-secondary-lightOpacity)',
          errorBg: 'var(--mui-palette-error-lightOpacity)',
          warningBg: 'var(--mui-palette-warning-lightOpacity)',
          infoBg: 'var(--mui-palette-info-lightOpacity)',
          successBg: 'var(--mui-palette-success-lightOpacity)'
        },
        SnackbarContent: {
          bg: '#F5F5F5',
          color: 'var(--mui-palette-background-paper)'
        },
        Switch: {
          defaultColor: 'var(--mui-palette-common-white)',
          defaultDisabledColor: 'var(--mui-palette-common-white)',
          primaryDisabledColor: 'var(--mui-palette-common-white)',
          secondaryDisabledColor: 'var(--mui-palette-common-white)',
          errorDisabledColor: 'var(--mui-palette-common-white)',
          warningDisabledColor: 'var(--mui-palette-common-white)',
          infoDisabledColor: 'var(--mui-palette-common-white)',
          successDisabledColor: 'var(--mui-palette-common-white)'
        },
        Tooltip: {
          bg: '#F5F5F5'
        },
        TableCell: {
          border: 'var(--mui-palette-divider)'
        },
        customColors: {
          bodyBg: '#282A42',
          chatBg: '#343752',
          greyLightBg: '#333851',
          inputBorder: 'rgb(var(--mui-mainColorChannels-dark) / 0.22)',
          tableHeaderBg: '#2c2d36', // calculated from actionHover (mainChannels-dark / 0.06) + background default
          tooltipText: '#30334E',
          trackBg: '#3C3F59'
        }
      }
    }
  } as Theme['colorSchemes']
}

export default colorSchemes
