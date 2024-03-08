import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface CouponsCardProps {
  code: string;
  discount: number;
}

export const CouponsCard = ({ code, discount }: CouponsCardProps) => {
   // Use the Clipboard API to write the coupon code to the clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert(`Coupon code copied to clipboard: ${code}`);
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Discount: {discount}%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {code}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleCopyToClipboard}>
            Copy
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
