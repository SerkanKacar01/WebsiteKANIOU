import Container from "@/components/ui/container";
import InventoryAlertSystem from "@/components/inventory/InventoryAlertSystem";
import { useLanguage } from "@/context/LanguageContext";

export default function InventoryAlerts() {
  const { t } = useLanguage();

  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            {t('Smart Inventory Alerts')}
          </h1>
          <p className="font-body text-text-medium max-w-2xl">
            {t('Stay informed about product availability. Get notified when your favorite products are back in stock or running low.')}
          </p>
        </div>
        
        <InventoryAlertSystem />
      </Container>
    </div>
  );
}