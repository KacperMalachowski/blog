package main

import (
	"os"

	"github.com/kacpermalachowski/personal-blog/infra/website"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cloudflareZoneId := os.Getenv("CLOUDFLARE_ZONE_ID")
		githubRepository := os.Getenv("GITHUB_REPOSITORY")
		_, err := website.New(ctx, "EU", cloudflareZoneId, githubRepository)
		if err != nil {
			return err
		}

		return nil
	})
}
