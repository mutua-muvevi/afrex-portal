import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box, Link, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, width, height, sx, ...other }, ref) => {
	const logoLight ="https://res.cloudinary.com/dqweh6zte/image/upload/v1704747044/afrex/Logo/Afrex_logo_white_fjx37r.png";
	const logoDark = "https://res.cloudinary.com/dqweh6zte/image/upload/v1704747053/afrex/Logo/Afrex_logo_black_osq8sr.png";

	const theme = useTheme();

	const logo = (
		<Box
			ref={ref}
			component="div"
			sx={{
				width: width ? width : 50,
				height:  height ? height : 40,
				display: "inline-flex",
				...sx,
			}}
			{...other}
		>
			<img src={theme.palette.mode === "dark" ? logoLight : logoDark} alt="sky dive rhino logo" style={{
				minWidth: "75px"
			}}/>

		

		</Box>
	);

	if (disabledLink) {
		return logo;
	}

	return (
		<Link component={RouterLink} to="/" sx={{ display: "contents" }}>
			{logo}
		</Link>
	);
});

Logo.propTypes = {
	sx: PropTypes.object,
	disabledLink: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
};

Logo.displayName = "Logo"

export default Logo;
