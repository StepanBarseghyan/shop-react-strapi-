import React from "react";
import { Layout, Row, Col, List } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./styles.module.css";
const { Footer } = Layout;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const contactInfo = [
  { title: "Store Name", description: "" },
  { title: "Address", description: "Abovyan Street, Yerevan, Armenia" },
  { title: "Phone", description: "+374 (98) 456-456" },
  { title: "Email", description: "example@example.com" },
];

const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Row gutter={16}>
        <Col span={12}>
          <h2>Contact Information</h2>
          <List
            split={false}
            size="small"
            itemLayout="horizontal"
            dataSource={contactInfo}
            renderItem={(item) => (
              <List.Item className={styles.list__item}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <MapContainer
            style={{ height: "300px", width: "100%" }}
            center={[40.1792, 44.4991]}
            zoom={13}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[40.1792, 44.4991]}>
              <Popup>Our store is located here</Popup>
            </Marker>
          </MapContainer>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
