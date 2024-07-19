import React, { useState } from "react";
import { Layout, Avatar, Button, Drawer, Badge, List, InputNumber } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import SearchBar from "../SearchBar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  updateCartItemQuantity,
} from "../../store/slices/cart";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const removeCartItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const clearAllCartItems = () => {
    dispatch(clearCart());
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ productId, quantity }));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <Header className={styles.header}>
      <a href="" className={styles.logo}>
        LOGO
      </a>
      <SearchBar />
      <div className={styles.header_right}>
        <Badge count={cartItems.length}>
          <Button
            type="primary"
            shape="circle"
            icon={<ShoppingCartOutlined />}
            onClick={toggleDrawer}
            className={styles.cart__button}
          />
        </Badge>
        <Drawer
          title="Your Cart"
          placement="right"
          onClose={toggleDrawer}
          open={isDrawerVisible}
          width={400}
        >
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => {
              const imageUrl = "http://localhost:1337" + item.imgUrl;
              return (
                <List.Item
                  actions={[
                    <InputNumber
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(value) =>
                        updateQuantity(item.id, Number(value))
                      }
                    />,
                    <Button type="link" onClick={() => removeCartItem(item.id)}>
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={imageUrl} />}
                    title={item.title}
                    description={`$${item.discountedPrice} x ${item.quantity}`}
                  />
                </List.Item>
              );
            }}
          />
          <div>Total: ${cartTotal.toFixed(2)}</div>
          <Button
            type="primary"
            danger
            onClick={clearAllCartItems}
            style={{ marginTop: 16 }}
          >
            Clear Cart
          </Button>
        </Drawer>
        <Avatar icon={<UserOutlined />} style={{ marginLeft: 20 }} />
        <Button
          className={styles.btn__logout}
          type="link"
          onClick={handleLoginLogout}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
