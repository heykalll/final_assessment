import { Badge, IconButton } from "@material-ui/core";
import { LocalMall } from "@material-ui/icons";
import Header from "@components/Header";
import useStyles from "../style";
import { useRouter } from 'next/router'

const ShoppingBagIcon = ({ data = 0 }) => {
  const Route = useRouter()
    return (
      <IconButton onClick={() => Route.push('/cart')}>
        <Badge badgeContent={data}>
          <LocalMall />
        </Badge>
      </IconButton>
    );
  };

const CustomHeader = ({ pageConfig }) => {
    const styles = useStyles();

    return (
        <Header
            pageConfig={pageConfig}
            RightComponent={<ShoppingBagIcon />}
        />
    );
};

export default CustomHeader;
