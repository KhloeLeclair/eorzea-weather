import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocale } from '@react-aria/i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSettings } from '../../context/settings';
import { AVAILABLE_LOCALES } from '../../constants';
import AppDrawer from '../AppDrawer';
import EorzeaClock from '../EorzeaClock';
import ThemeButton from '../ThemeButton';

const LOCALES = Object.keys(AVAILABLE_LOCALES);

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      padding: 0,
    },
    menuLink: {
      color: 'inherit',
      display: 'block',
      padding: [theme.spacing(0.75), theme.spacing(2)]
        .map((v) => `${v}px`)
        .join(' '),
      textDecoration: 'inherit',
    },
    title: {
      color: 'inherit',
      textDecoration: 'none',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(2),
      },
    },
    flex: {
      flex: 1,
    },
  }),
);

const AppHeader: FC = () => {
  const { locale } = useLocale();
  const settings = useSettings();
  const [isHome, setIsHome] = useState(true);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const classes = useStyles();

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLanguageIconClick = useCallback(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);

  const handleMenuIconClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handlePickLocale = useCallback(
    ({ currentTarget }) => {
      settings.dispatch({
        type: 'setlocale',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        locale: currentTarget.dataset.locale,
      });
      setAnchorEl(null);
    },
    [settings],
  );

  useEffect(() => {
    setIsHome(router.pathname === '/');
  }, [router.pathname]);

  return (
    <>
      <AppBar elevation={isHome ? 0 : 4} position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={handleMenuIconClick}>
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.flex}
            color="inherit"
            noWrap
            variant="h6"
          >
            {!isHome && (
              <Link href="/" prefetch={false}>
                <a className={classes.title}>Eorzea Weather</a>
              </Link>
            )}
          </Typography>

          <ThemeButton />

          {(LOCALES || []).length > 1 && (
            <>
              <IconButton color="inherit" onClick={handleLanguageIconClick}>
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
                onClose={handleMenuClose}
                open={!!anchorEl}
                transformOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
              >
                {(LOCALES || []).map((loc) => (
                  <MenuItem
                    className={classes.menuItem}
                    key={`item-${loc}`}
                    onClick={handlePickLocale}
                    selected={loc === locale}
                    data-locale={loc}
                  >
                    <div className={classes.menuLink}>
                      {AVAILABLE_LOCALES[loc]}
                    </div>
                    {/*<Link href={router.asPath} locale={locale} prefetch={false}>
                      <a
                        className={classes.menuLink}
                        hrefLang={locale}
                        lang={locale}
                      >
                        {AVAILABLE_LOCALES[locale]}
                      </a>
                </Link>*/}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          <EorzeaClock />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <AppDrawer onClose={handleDrawerClose} open={open} />
    </>
  );
};

export default AppHeader;
