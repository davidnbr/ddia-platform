{ pkgs, ... }:

{
  cachix.pull = [ "nixpkgs-nodejs" ];

  languages = {
    javascript = {
      enable = true;
      package = pkgs.nodejs_22_22;
    };
  };

  enterShell = ''
    echo "Node running in $(which node)"
    echo "Node version: $(node --version)"
  '';

}
