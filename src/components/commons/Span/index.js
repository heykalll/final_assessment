import classNames from "classnames";
import useStyles from "./style";

const Span = ({ className = {}, children }) => {
  const styles = useStyles();
  const customClass = classNames(styles.span, className);
  return <div className={customClass}>{children}</div>;
};

export default Span;
