import { Box, Grid, Button, IconButton, Alert } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
import { CustomTextField } from "../comman/CustomTextField";
import { CustomText } from "../comman/CustomText";

export const AccountDetailsTab = ({
  accountData,
  setAccountData,
  showPassword,
  setShowPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleSaveChanges,
  isSaving,
  saveError,
  saveSuccess,
  userProfile,
  setSaveError,
  setSaveSuccess,
}) => {
  return (
    <Box>
      <CustomText
        variant="h4"
        sx={{
          fontSize: { xs: 24, md: 32 },
          fontWeight: 700,
          color: "var(--themeColor)",
          mb: 2,
        }}
      >
        Account Details
      </CustomText>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="First Name"
            placeholder="First Name"
            value={accountData.firstName}
            onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Last Name"
            placeholder="Last Name"
            value={accountData.lastName}
            onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Email"
            placeholder="Email"
            type="email"
            value={accountData.email}
            disabled
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#666",
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Phone"
            placeholder="Phone"
            value={accountData.phone}
            onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomText variant="h6" sx={{ fontWeight: 600, color: "var(--themeColor)" }}>
            Change Password
          </CustomText>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Current Password"
            placeholder="Current Password"
            type={showPassword ? "text" : "password"}
            value={accountData.currentPassword}
            onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="New Password"
            placeholder="New Password"
            type={showNewPassword ? "text" : "password"}
            value={accountData.newPassword}
            onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={accountData.confirmPassword}
            onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          {saveError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {saveError}
            </Alert>
          )}
          {saveSuccess && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {saveSuccess}
            </Alert>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                if (userProfile) {
                  setAccountData({
                    firstName: userProfile.name?.split(' ')[0] || "",
                    lastName: userProfile.name?.split(' ').slice(1).join(' ') || "",
                    email: userProfile.email || "",
                    phone: userProfile.phone || "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }
                setSaveError("");
                setSaveSuccess("");
              }}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
                "&:hover": {
                  borderColor: "var(--themeColor)",
                  backgroundColor: "#fbeeee",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveChanges}
              disabled={isSaving}
              sx={{
                bgcolor: "var(--themeColor)",
                color: "#fff",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1,
                boxShadow: "0 2px 8px rgba(95, 41, 48, 0.25)",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "var(--specialColor)",
                  boxShadow: "0 4px 12px rgba(95, 41, 48, 0.3)",
                },
                "&:disabled": {
                  bgcolor: "#ccc",
                  color: "#888",
                  boxShadow: "none",
                },
              }}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

