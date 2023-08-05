import Modal from "@mui/material/Modal";
import kids from "../assets/sizeCharts/kids.png";
import womens from "../assets/sizeCharts/womens.png";
import mens from "../assets/sizeCharts/mens.png";
import Image from "next/image";
import { Close } from "@mui/icons-material";

interface SizeChartModalProps {
  isVisible: boolean;
  setVisibility: (isVisible: boolean) => void;
}

const sizeCharts = [kids, womens, mens];

const SizeChartModal = ({ isVisible, setVisibility }: SizeChartModalProps) => {
  return (
    <Modal open={isVisible} onClose={() => setVisibility(false)}>
      <div className="flex h-full items-center justify-center">
        <div className="h-1/2 overflow-y-auto bg-white">
          <div className="flex justify-between bg-primary p-2 px-4 text-white">
            <p className="text-xl font-semibold">Size Charts</p>
            <button onClick={() => setVisibility(false)}>
              <Close />
            </button>
          </div>
          <div className="space-y-4 p-6">
            {sizeCharts.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Size Chart"
                width={500}
                height={500}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SizeChartModal;
