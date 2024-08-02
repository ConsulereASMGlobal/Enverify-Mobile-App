import CollectSVG from "@src/assets/dashboardIcons/CollectSVG";
import DiversionSVG from "@src/assets/dashboardIcons/DiversionSVG";
import ProcessSVG from "@src/assets/dashboardIcons/ProcessSVG";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";
import ReceivedSVG from "@src/assets/dashboardIcons/ReceivedSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";
import CollectedSVG from "@src/assets/dashboardStat/CollectedSVG";
import ProcessedSVG from "@src/assets/dashboardStat/ProcessedSVG";
import SuppliedSVG from "@src/assets/dashboardStat/SuppliedSVG";
import UserSVG from "@src/assets/dashboardStat/UserSVG";
import HistorySvgIcon from "@src/assets/tabIcons/HistorySvgIcon";
import StocksSvgIcon from "@src/assets/tabIcons/StocksSvgIcon";
import { colors } from "@src/globals/colors";

const components: any = {
  collect: CollectSVG,
  process: ProcessSVG,
  supply: SupplySVG,
  receive: ReceiveSVG,
  received: ReceivedSVG,
  history: HistorySvgIcon,
  stocksSvg: StocksSvgIcon,
  collected: CollectedSVG,
  userName: UserSVG,
  processed: ProcessedSVG,
  supplied: SuppliedSVG,
  diversion: DiversionSVG,
};
export const CustomIcon = (
  iconName: any,
  size?: any,
  color = colors.primary
) => {
  const IconComponent = components[iconName];
  return <IconComponent color={color} size={size} />;
};
