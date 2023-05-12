import cls from 'classnames';
import Button from '../Button';
import './main-title.module.css';

type Props = {
  children: string,
  btnLabel: string,
  btnProps: any,
  type: string,
}
function MainTitle({ children, btnLabel, type = '', btnProps = {} }: Props) {
  const classes = cls('main-title spacing', {
    'main-title__search': type === 'search',
    'd-flex tcl-jc-between tcl-ais-center': btnLabel,
  });

  return (
    <div className={classes}>
      <h2>{children}</h2>
      {btnLabel && <Button {...btnProps}>{btnLabel}</Button>}
    </div>
  );
}

export default MainTitle;
